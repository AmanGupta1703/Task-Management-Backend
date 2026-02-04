import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Get all tasks for the logged-in user
// @route   GET /api/v1/tasks
export const getTasks = asyncHandler(async (req, res) => {
  // req.user is populated by verifyJWT middleware
  const tasks = await Task.find({ user: req.user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

// @desc    Create a new task
// @route   POST /api/v1/tasks
export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }

  const task = await Task.create({
    title,
    description,
    user: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

// @desc    Update a specific task
// @route   PATCH /api/v1/tasks/:id
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;

  const updateFields = {};

  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (isCompleted !== undefined) updateFields.isCompleted = isCompleted;

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "No fields provided for update");
  }

  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    {
      $set: updateFields,
    },
    { new: true, runValidators: true },
  );

  if (!task) {
    throw new ApiError(
      404,
      "Task not found or you do not have permission to update it",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

// @desc    Delete a specific task
// @route   DELETE /api/v1/tasks/:id
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!task) {
    throw new ApiError(
      404,
      "Task not found or you do not have permission to delete it",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});
