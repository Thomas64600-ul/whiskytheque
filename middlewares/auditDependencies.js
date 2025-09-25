import cron from "node-cron";
import { exec } from "child_process";

function auditDependencies() {
  exec("npm audit --json", { timeout: 30000 }, (error, stdout, stderr) => {
    if (error) {
      console.error("Erreur lors de l'exécution de npm audit:", error.message);
      return;
    }
    if (stderr) {
      console.error("Erreur standard lors de npm audit:", stderr);
      return;
    }
    try {
      const auditReport = JSON.parse(stdout);
      const v = auditReport.metadata.vulnerabilities;
      console.log("Audit des dépendances :");
      console.table({
        Faible: v.low || 0,
        Modérée: v.moderate || 0,
        Élevée: v.high || 0,
        Critique: v.critical || 0,
      });
      console.log("Audit terminé à", new Date().toLocaleString());
    } catch (parseError) {
      console.error("Erreur de parsing du rapport d'audit:", parseError);
    }
  });
}

// Tous les jours à minuit
const auditTask = cron.schedule("0 0 0 * * *", () => {
  console.log("Démarrage du cron d'audit des dépendances...");
  auditDependencies();
});

// Lancer uniquement hors prod
if (process.env.NODE_ENV !== "production") {
  auditTask.start();
}

export default auditTask;
