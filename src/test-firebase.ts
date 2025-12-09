// Тестовый файл для проверки Firebase подключения
import { db } from "./lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// Функция для тестирования записи в Firestore
export const testFirebaseConnection = async () => {
  try {
    console.log("🔥 Тестируем подключение к Firebase...");
    
    const docRef = await addDoc(collection(db, "bookings"), {
      name: "Dmitrii",
      email: "stepanov@gmail.com",
      phone: "11",
      testData: true,
      createdAt: new Date().toISOString()
    });
    
    console.log("✅ Данные успешно сохранены в Firestore!");
    console.log("📄 Document ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Ошибка при сохранении в Firebase:", error);
    throw error;
  }
};

// Автоматический тест при импорте (раскомментируйте для тестирования)
// testFirebaseConnection();








