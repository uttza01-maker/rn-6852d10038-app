import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    // หน่วงเวลา 3 วินาที แล้วเปลี่ยนหน้า
    const timer = setTimeout(() => {
      router.replace("/taxi_fare");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Taxi Fare</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Taxi Image */}
        <Image
          source={require("../assets/images/taxi.png")}
          style={styles.taxiImage}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Taxi Fare Calculator</Text>
        <Text style={styles.subtitle}>คำนวณค่าโดยสารแท็กซี่</Text>

        {/* ไอคอนหมุนๆ วงกลมอยู่ตรงนี้ครับ */}
        <ActivityIndicator
          size="large"
          color="#F5A623"
          style={styles.spinner}
        />

        <Text style={styles.loadingText}>กำลังเข้าสู่ระบบ...</Text>
      </View>

      {/* Footer - Profile */}
      <View style={styles.footer}>
        <Image
          source={require("../assets/images/me.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>จัดทำโดย</Text>
        <Text style={styles.profileId}>6852d10038 ปิยพันธ์ คำมูล</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#F5A623",
    paddingTop: 50,
    paddingBottom: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  taxiImage: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 24,
  },
  spinner: {
    marginBottom: 16, // เว้นระยะห่างระหว่างตัวหมุนกับตัวหนังสือ
  },
  loadingText: {
    fontSize: 14,
    color: "#F5A623",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 32,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: "#F5A623",
  },
  profileName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  profileId: {
    fontSize: 12,
    color: "#999",
  },
});
