import cron from "node-cron";
import db from "../config/db.js"; 

async function deleteUnverifiedUsers() {
  const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);
  const formattedDate = threeDaysAgo.toISOString().slice(0, 19).replace("T", " ");

  const sql = `
    DELETE FROM users
    WHERE is_verified = 0
    AND created_at < ?
  `;

  try {
    const [result] = await db.execute(sql, [formattedDate]);
    console.log(`Suppression effectuée : ${result.affectedRows} utilisateurs non vérifiés supprimés.`);
  } catch (error) {
    console.error("Erreur suppression utilisateurs non vérifiés :", error.message);
  }
}

// Tous les 3 jours à 14h12
const task = cron.schedule("12 14 */3 * *", () => {
  console.log("Cron job démarré pour supprimer les utilisateurs non vérifiés...");
  deleteUnverifiedUsers();
});

export default task;

