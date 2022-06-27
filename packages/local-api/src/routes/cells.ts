import fs from "fs/promises";
import path from "path";
import express from "express";
interface ICell {
	id: string;
	content: string;
	type: "text" | "code";
}
export const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router();
	router.use(express.json());
	const fullPath = path.join(dir, filename);

	router.get("/cells", async (req, res) => {
		try {
			const result = await fs.readFile(fullPath, "utf-8");
			res.status(200).send(JSON.parse(result));
		} catch (error: any) {
			if (error.code === "ENOENT") {
				await fs.writeFile(fullPath, "[]", "utf-8");
				res.status(200).send([]);
			} else {
				throw error;
			}
		}
	});
	router.post("/cells", async (req, res) => {
		const { cells }: { cells: ICell[] } = req.body;
		await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
		res.status(200).send({ status: "OK" });
	});

	return router;
};
