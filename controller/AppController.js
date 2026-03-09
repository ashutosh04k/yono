import App from "../models/App.js";

/* Get all apps */

export const getApps = async (req, res) => {
  const apps = await App.find().sort({ createdAt: -1 });
  res.json(apps);
};

/* Add app */

export const createApp = async (req, res) => {
  const app = new App(req.body);
  await app.save();
  res.json(app);
};

/* Update app */

export const updateApp = async (req, res) => {
  const app = await App.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(app);
};

/* Delete app */

export const deleteApp = async (req, res) => {
  await App.findByIdAndDelete(req.params.id);
  res.json({ message: "App deleted" });
};