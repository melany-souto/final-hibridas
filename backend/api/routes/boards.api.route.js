import express from "express";

// middlewares
import { verifyToken } from "../../middleware/auth/verifyToken.js";
import { validate } from "../../middleware/schema/validate.js";

import { loadBoard } from "../../middleware/board/loadBoard.js";
import { verifyBoardAccess } from "../../middleware/board/verifyBoardAccess.js";
import { verifyBoardOwner } from "../../middleware/board/verifyBoardOwner.js";

import * as controller from "../controllers/boards.api.controller.js";

import * as schema from "../../schemas/board.schemas.js";

const router = express.Router();


router.get("/", verifyToken, controller.getBoardsShared); 
router.get("/user/:userId", verifyToken, controller.getBoardsByUser);

router.get(
  "/:boardId",
  verifyToken,
  loadBoard,
  verifyBoardAccess,
  controller.getBoardById
);

router.post(
  "/",
  verifyToken,
  validate(schema.createBoardSchema),
  controller.createBoard
);

router.patch(
  "/:boardId",
  verifyToken,
  loadBoard,
  verifyBoardOwner,
  validate(schema.updateBoardSchema),
  controller.updateBoard
);

router.put(
  "/:boardId/recipes",
  verifyToken,
  loadBoard,
  verifyBoardAccess,
  controller.addRecipeToBoard
);

router.delete(
  "/:boardId",
  verifyToken,
  loadBoard,
  verifyBoardOwner,
  controller.deleteBoardLog
);

router.post(
  "/:boardId/share",
  verifyToken,
  loadBoard,
  verifyBoardOwner,
  controller.shareBoard
);

router.delete(
  "/:boardId/share",
  verifyToken,
  loadBoard,
  verifyBoardOwner,
  controller.unshareBoard
);

export default router;