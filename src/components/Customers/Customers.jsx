import React, { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../lib/customers";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
  });

  const [editingId, setEditingId] = useState(null);

  // -------------------------------
  // Загрузка клиентов
  // -------------------------------
  async function loadCustomers() {
    setLoading(true);
    const { data, error } = await getCustomers();

    if (error) console.error(error);
    else setCustomers(data);

    setLoading(false);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  // -------------------------------
  // Добавить или обновить клиента
  // -------------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await updateCustomer(editingId, form);
    } else {
      await addCustomer(form);
    }

    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postal_code: "",
    });

    setEditingId(null);
    loadCustomers();
  }

  // -------------------------------
  // Удаление клиента
  // -------------------------------
  async function handleDelete(id) {
    await deleteCustomer(id);
    loadCustomers();
  }

  // -------------------------------
  // Начать редактирование
  // -------------------------------
  function startEdit(customer) {
    setForm(customer);
    setEditingId(customer.id);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customers</h1>

      {/* =========================
          Форма добавления / редактирования
      ========================== */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={form.postal_code}
          onChange={(e) =>
            setForm({ ...form, postal_code: e.target.value })
          }
        />

        <button type="submit">
          {editingId ? "Update" : "Add"} Customer
        </button>
      </form>

      {/* =========================
          Таблица клиентов
      ========================== */}
      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>
                  {c.first_name} {c.last_name}
                </td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.city}</td>
                <td>
                  <button onClick={() => startEdit(c)}>Edit</button>
                  <button onClick={() => handleDelete(c.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
