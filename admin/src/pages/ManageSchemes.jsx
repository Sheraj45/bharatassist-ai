import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const CATEGORIES = [
  { value: "student", label: "Students" },
  { value: "farmer", label: "Farmers" },
  { value: "job_seeker", label: "Job Seekers" },
  { value: "senior_citizen", label: "Senior Citizens" },
  { value: "general", label: "General" },
];

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "student",
  eligibility: "",
  benefits: "",
  applicationProcess: "",
  officialWebsite: "",
  state: "All India",
};

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || fallback;
}

export default function ManageSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [notice, setNotice] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadSchemes = useCallback(async () => {
    setLoading(true);
    setPageError("");

    try {
      const response = await api.get("/schemes");

      if (!Array.isArray(response.data.schemes)) {
        throw new Error("Unexpected scheme data received from the server.");
      }

      setSchemes(response.data.schemes);
    } catch (error) {
      setPageError(
        getErrorMessage(error, error.message || "Unable to load schemes."),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSchemes();
  }, [loadSchemes]);

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schemes.filter((scheme) => {
      const matchesSearch =
        !query ||
        scheme.name?.toLowerCase().includes(query) ||
        scheme.description?.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "all" || scheme.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [schemes, search, categoryFilter]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setNotice("");
    setPageError("");
    setModalOpen(true);
  };

  const openEditModal = (scheme) => {
    setEditingId(scheme._id);

    setForm({
      name: scheme.name || "",
      description: scheme.description || "",
      category: scheme.category || "student",
      eligibility: scheme.eligibility || "",
      benefits: scheme.benefits || "",
      applicationProcess: scheme.applicationProcess || "",
      officialWebsite: scheme.officialWebsite || "",
      state: scheme.state || "All India",
    });

    setNotice("");
    setPageError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setPageError("");
    setNotice("");

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        eligibility: form.eligibility.trim(),
        benefits: form.benefits.trim(),
        applicationProcess: form.applicationProcess.trim(),
        officialWebsite: form.officialWebsite.trim(),
        state: form.state.trim() || "All India",
      };

      if (editingId) {
        await api.put(`/schemes/${editingId}`, payload);
        setNotice("Scheme updated successfully.");
      } else {
        await api.post("/schemes", payload);
        setNotice("Scheme added successfully.");
      }

      setModalOpen(false);
      setEditingId(null);
      setForm({ ...EMPTY_FORM });

      await loadSchemes();
    } catch (error) {
      setPageError(
        getErrorMessage(error, "Unable to save the scheme. Please try again."),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (scheme) => {
    const confirmed = window.confirm(
      `Delete "${scheme.name}"?\n\nThis will permanently remove the scheme from the database.`,
    );

    if (!confirmed) return;

    setDeletingId(scheme._id);
    setPageError("");
    setNotice("");

    try {
      await api.delete(`/schemes/${scheme._id}`);

      setSchemes((previous) =>
        previous.filter((item) => item._id !== scheme._id),
      );

      setNotice("Scheme deleted successfully.");
    } catch (error) {
      setPageError(getErrorMessage(error, "Unable to delete the scheme."));
    } finally {
      setDeletingId(null);
    }
  };

  const categoryLabel = (value) =>
    CATEGORIES.find((category) => category.value === value)?.label || value;

  return (
    <div className="schemes-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">CONTENT MANAGEMENT</p>
          <h1>Government Schemes</h1>
          <p>Manage the schemes available on BharatAssist AI.</p>
        </div>

        <button className="primary-button" onClick={openCreateModal}>
          + Add Scheme
        </button>
      </header>

      {pageError && (
        <div className="error-message" role="alert">
          {pageError}
        </div>
      )}

      {notice && (
        <div className="success-message" role="status">
          {notice}
        </div>
      )}

      <section className="content-card">
        <div className="schemes-toolbar">
          <div>
            <h2>All schemes</h2>
            <p>
              {loading
                ? "Loading scheme records..."
                : `${filteredSchemes.length} of ${schemes.length} schemes`}
            </p>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={loadSchemes}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        <div className="scheme-filters">
          <input
            type="search"
            aria-label="Search schemes"
            placeholder="Search by scheme name or description..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">All categories</option>

            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="empty-state">Loading schemes...</div>
        ) : pageError && schemes.length === 0 ? (
          <div className="empty-state">
            Scheme data could not be loaded. Check the backend and try again.
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="empty-state">
            <strong>No schemes found</strong>
            <p>Try another search or category, or add a new scheme.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="schemes-table">
              <thead>
                <tr>
                  <th>Scheme</th>
                  <th>Category</th>
                  <th>State / Coverage</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSchemes.map((scheme) => (
                  <tr key={scheme._id}>
                    <td>
                      <div className="scheme-name">{scheme.name}</div>

                      <div className="scheme-description">
                        {scheme.description}
                      </div>
                    </td>

                    <td>
                      <span className="category-badge">
                        {categoryLabel(scheme.category)}
                      </span>
                    </td>

                    <td>{scheme.state || "All India"}</td>

                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="text-button edit-button"
                          onClick={() => openEditModal(scheme)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="text-button delete-button"
                          disabled={deletingId === scheme._id}
                          onClick={() => handleDelete(scheme)}
                        >
                          {deletingId === scheme._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modalOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            className="scheme-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheme-modal-title"
          >
            <header className="modal-header">
              <div>
                <p className="eyebrow">
                  {editingId ? "EDIT RECORD" : "NEW RECORD"}
                </p>

                <h2 id="scheme-modal-title">
                  {editingId ? "Edit scheme" : "Add government scheme"}
                </h2>
              </div>

              <button
                type="button"
                className="modal-close"
                aria-label="Close form"
                onClick={closeModal}
                disabled={saving}
              >
                ×
              </button>
            </header>

            <form className="scheme-form" onSubmit={handleSubmit}>
              <div className="form-field full-width">
                <label htmlFor="name">Scheme name *</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  maxLength={200}
                  required
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  required
                >
                  {CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="state">State / Coverage *</label>
                <input
                  id="state"
                  name="state"
                  value={form.state}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="eligibility">Eligibility *</label>
                <textarea
                  id="eligibility"
                  name="eligibility"
                  value={form.eligibility}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="benefits">Benefits *</label>
                <textarea
                  id="benefits"
                  name="benefits"
                  value={form.benefits}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="applicationProcess">
                  Application process *
                </label>
                <textarea
                  id="applicationProcess"
                  name="applicationProcess"
                  value={form.applicationProcess}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="officialWebsite">Official website *</label>
                <input
                  id="officialWebsite"
                  name="officialWebsite"
                  type="url"
                  placeholder="https://..."
                  value={form.officialWebsite}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {pageError && (
                <div className="error-message full-width" role="alert">
                  {pageError}
                </div>
              )}

              <div className="form-actions full-width">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeModal}
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
                      ? "Save changes"
                      : "Add scheme"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
