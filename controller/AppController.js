import App from "../models/App.js";

/* Get all apps */

const slugify = (text) => {
  return text
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-$/, "");
};

export const getApps = async (req, res) => {
  const apps = await App.find().sort({ createdAt: -1 });
  res.json(apps);
};

/* Add app */

export const createApp = async (req, res) => {
  try {
    let baseSlug = slugify(req.body.name);
    let slug = baseSlug;
    let count = 1;

    // ensure unique slug
    while (await App.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const app = new App({
      ...req.body,
      slug,
    });

    await app.save();
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Update app */

export const updateApp = async (req, res) => {
  try {
    let slug = slugify(req.body.name);

    let baseSlug = slug;
    let count = 1;

    // ensure unique (exclude current app)
    while (
      await App.findOne({
        slug,
        _id: { $ne: req.params.id },
      })
    ) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const app = await App.findByIdAndUpdate(
      req.params.id,
      { ...req.body, slug },
      { new: true }
    );

    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Delete app */

export const deleteApp = async (req, res) => {
  await App.findByIdAndDelete(req.params.id);
  res.json({ message: "App deleted" });
};