import { TTodo } from "../types/types";

export class SQLiteService {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  async initDatabase() {
    try {
      await this.db.runAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          _id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          isCompleted INTEGER DEFAULT 0,
          createdAt TEXT DEFAULT (datetime('now', 'localtime'))
        )
      `);
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }

  async getAllTasks(): Promise<TTodo[]> {
    try {
      const result = await this.db.getAllAsync(`
        SELECT * FROM tasks ORDER BY _id DESC
      `);
      return result.map((task: any) => ({
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
        isCompleted: Boolean(task.isCompleted),
        createdAt: new Date(task.createdAt),
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }

  async createTask(title: string, description: string): Promise<void> {
    try {
      await this.db.runAsync(
        `INSERT INTO tasks (title, description) VALUES (?, ?)`,
        [title, description]
      );
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async updateTask(id: string, title: string, description: string): Promise<void> {
    try {
      await this.db.runAsync(
        `UPDATE tasks SET title = ?, description = ? WHERE _id = ?`,
        [title, description, id]
      );
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async toggleTaskStatus(id: string, isCompleted: boolean): Promise<void> {
    try {
      await this.db.runAsync(
        `UPDATE tasks SET isCompleted = ? WHERE _id = ?`,
        [isCompleted ? 1 : 0, id]
      );
    } catch (error) {
      console.error("Error toggling task status:", error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.db.runAsync(`DELETE FROM tasks WHERE _id = ?`, [id]);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}
