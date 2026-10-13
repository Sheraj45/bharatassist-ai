import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const CATEGORIES = [
  { value: "student", label: "Students" },
  { value: "farmer", label: "Farmers" },
  { value: "job_seeker", label: "Job Seekers" },
  { value: "senior_citizen", label: "Senior Citizens" },
  { value: "general", label: "General" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "te", label: "Telugu" },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "general",
  language: "en",
  source: "",
  officialWebsite: "",
  publishedDate: new Date().toISOString().slice(0, 16),
  originalUrl: "",
  imageUrl: "",
  sourceType: "manual",
  isLive: false,
};

function toLocalDateTime(date) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  const localDate = new Date(
    parsed.getTime() - parsed.getTimezoneOffset() * 60000,
  );

  return localDate.toISOString().slice(0, 16);
}

function formatDate(date) {
  if (!date) return "Not specified";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Invalid date";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ManageUpdates() {
  const [updates, setUpdates] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [importingPIB, setImportingPIB] = useState(false);
  const [pibResult, setPibResult] = useState(null);
  const [pibError, setPibError] = useState("");

  const loadUpdates = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/admin/updates");
      setUpdates(response.data.updates || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load government updates.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUpdates();
  }, [loadUpdates]);

  const filteredUpdates = useMemo(() => {
    return updates.filter((update) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        update.title?.toLowerCase().includes(query) ||
        update.description?.toLowerCase().includes(query) ||
        update.source?.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "all" || update.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && update.isLive) ||
        (statusFilter === "draft" && !update.isLive);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [updates, search, categoryFilter, statusFilter]);

  const publishedCount = updates.filter((update) => update.isLive).length;

  const draftCount = updates.length - publishedCount;

  function openCreateForm() {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      publishedDate: new Date().toISOString().slice(0, 16),
    });
    setError("");
    setNotice("");
    setShowForm(true);
  }

  function openEditForm(update) {
    setEditingId(update._id);

    setForm({
      title: update.title || "",
      description: update.description || "",
      category: update.category || "general",
      language: update.language || "en",
      source: update.source || "",
      officialWebsite: update.officialWebsite || "",
      publishedDate: toLocalDateTime(update.publishedDate),
      originalUrl: update.originalUrl || "",
      imageUrl: update.imageUrl || "",
      sourceType: update.sourceType || "manual",
      isLive: Boolean(update.isLive),
    });

    setError("");
    setNotice("");
    setShowForm(true);
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      source: form.source.trim(),
      officialWebsite: form.officialWebsite.trim(),
      originalUrl: form.originalUrl.trim(),
      imageUrl: form.imageUrl.trim(),
      publishedDate: form.publishedDate
        ? new Date(form.publishedDate).toISOString()
        : new Date().toISOString(),
    };

    try {
      if (editingId) {
        await api.put(`/updates/${editingId}`, payload);
        setNotice("Government update updated successfully.");
      } else {
        await api.post("/updates", payload);
        setNotice("Government update created successfully.");
      }

      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);

      await loadUpdates();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save the government update.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(update) {
    const action = update.isLive ? "unpublish" : "publish";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${update.title}"?`,
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      await api.put(`/updates/${update._id}`, {
        isLive: !update.isLive,
      });

      setNotice(
        `Update ${action === "publish" ? "published" : "unpublished"} successfully.`,
      );

      await loadUpdates();
    } catch (err) {
      setError(
        err.response?.data?.message || `Unable to ${action} this update.`,
      );
    }
  }

  async function handleDelete(update) {
    const confirmed = window.confirm(
      `Delete "${update.title}" permanently? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      await api.delete(`/updates/${update._id}`);

      setNotice("Government update deleted successfully.");

      await loadUpdates();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete the government update.",
      );
    }
  }

  const handlePIBImport = async () => {
    setImportingPIB(true);
    setPibResult(null);
    setPibError("");

    try {
      const response = await api.post("/admin/import-pib");
      setPibResult(response.data.result);

      // Refresh the updates table after importing.
      await fetchUpdates();
    } catch (error) {
      setPibError(
        error.response?.data?.message ||
          "Unable to import PIB news. Please try again.",
      );
    } finally {
      setImportingPIB(false);
    }
  };

  return (
    <section className="updates-management">
      <div className="page-heading">
        <div>
          <h1>Government Updates</h1>
          <p>Create, review, and publish government announcements.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={openCreateForm}
        >
          + Add Update
        </button>
      </div>

      <section className="pib-import-panel">
        <div className="pib-import-info">
          <h2>PIB News Import</h2>
          <p>
            Fetch the latest official government announcements from the Press
            Information Bureau.
          </p>
        </div>

        <button
          type="button"
          className="pib-import-button"
          onClick={handlePIBImport}
          disabled={importingPIB}
        >
          {importingPIB ? "Importing PIB News..." : "Import Latest PIB News"}
        </button>

        {pibError && (
          <div className="pib-import-error" role="alert">
            {pibError}
          </div>
        )}

        {pibResult && (
          <div className="pib-import-results" role="status">
            <h3>Import Completed Successfully</h3>

            <div className="pib-result-grid">
              <div>
                <span>Total Articles</span>
                <strong>{pibResult.total}</strong>
              </div>

              <div>
                <span>Created</span>
                <strong>{pibResult.created}</strong>
              </div>

              <div>
                <span>Updated</span>
                <strong>{pibResult.updated}</strong>
              </div>

              <div>
                <span>Skipped</span>
                <strong>{pibResult.skipped}</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      {error && <div className="admin-notice error">{error}</div>}

      {notice && <div className="admin-notice success">{notice}</div>}

      <div className="update-stats">
        <div className="update-stat-card">
          <span>Total Updates</span>
          <strong>{updates.length}</strong>
        </div>

        <div className="update-stat-card">
          <span>Published</span>
          <strong>{publishedCount}</strong>
        </div>

        <div className="update-stat-card">
          <span>Drafts</span>
          <strong>{draftCount}</strong>
        </div>
      </div>

      <div className="updates-toolbar">
        <input
          type="search"
          placeholder="Search title, description, or source..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search government updates"
        />

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>

          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by publication status"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {loading ? (
        <div className="updates-empty">Loading updates...</div>
      ) : filteredUpdates.length === 0 ? (
        <div className="updates-empty">
          <h3>No updates found</h3>
          <p>Try changing your search or add a new announcement.</p>
        </div>
      ) : (
        <div className="updates-table-wrapper">
          <table className="updates-table">
            <thead>
              <tr>
                <th>Announcement</th>
                <th>Category</th>
                <th>Language</th>
                <th>Published Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUpdates.map((update) => (
                <tr key={update._id}>
                  <td>
                    <div className="update-title-cell">
                      <strong>{update.title}</strong>
                      <span>{update.source || "Unknown source"}</span>
                    </div>
                  </td>

                  <td>
                    {CATEGORIES.find(
                      (category) => category.value === update.category,
                    )?.label || update.category}
                  </td>

                  <td>
                    {LANGUAGES.find(
                      (language) => language.value === update.language,
                    )?.label || update.language}
                  </td>

                  <td>{formatDate(update.publishedDate)}</td>

                  <td>
                    <span
                      className={`update-status ${
                        update.isLive ? "published" : "draft"
                      }`}
                    >
                      {update.isLive ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td>
                    <div className="update-actions">
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => openEditForm(update)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => togglePublish(update)}
                      >
                        {update.isLive ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => handleDelete(update)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="updates-table-footer">
            Showing {filteredUpdates.length} of {updates.length} updates
          </div>
        </div>
      )}

      {showForm && (
        <div
          className="update-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              setShowForm(false);
            }
          }}
        >
          <div
            className="update-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-form-title"
          >
            <div className="update-modal-heading">
              <div>
                <h2 id="update-form-title">
                  {editingId ? "Edit Update" : "Add Government Update"}
                </h2>

                <p>Enter the announcement details below.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
                disabled={saving}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {error && <div className="admin-notice error">{error}</div>}

              <div className="update-form-grid">
                <label className="form-field full-width">
                  Announcement Title *
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    maxLength={300}
                    placeholder="Enter announcement title"
                  />
                </label>

                <label className="form-field full-width">
                  Description *
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Enter announcement details"
                  />
                </label>

                <label className="form-field">
                  Category *
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  Language *
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    required
                  >
                    {LANGUAGES.map((language) => (
                      <option key={language.value} value={language.value}>
                        {language.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  Source *
                  <input
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Ministry of Education"
                  />
                </label>

                <label className="form-field">
                  Source Type *
                  <select
                    name="sourceType"
                    value={form.sourceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="manual">Manual</option>
                    <option value="official">Official</option>
                    <option value="news">News</option>
                  </select>
                </label>

                <label className="form-field full-width">
                  Official Website *
                  <input
                    type="url"
                    name="officialWebsite"
                    value={form.officialWebsite}
                    onChange={handleChange}
                    required
                    placeholder="https://example.gov.in"
                  />
                </label>

                <label className="form-field full-width">
                  Original Article URL
                  <input
                    type="url"
                    name="originalUrl"
                    value={form.originalUrl}
                    onChange={handleChange}
                    placeholder="https://example.gov.in/announcement"
                  />
                </label>

                <label className="form-field full-width">
                  Image URL
                  <input
                    type="url"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="Optional image URL"
                  />
                </label>

                <label className="form-field">
                  Published Date *
                  <input
                    type="datetime-local"
                    name="publishedDate"
                    value={form.publishedDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="form-field publish-checkbox">
                  <input
                    type="checkbox"
                    name="isLive"
                    checked={form.isLive}
                    onChange={handleChange}
                  />
                  Publish immediately
                </label>
              </div>

              <div className="update-form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Create Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
