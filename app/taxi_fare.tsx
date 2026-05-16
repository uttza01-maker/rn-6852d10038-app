import { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// ฟังก์ชันคำนวณราคาค่าโดยสารตามเกณฑ์จริง
function calculateFare(km: number, minutes: number): number {
  if (km <= 0) return 0;

  let fare = 35; // กิโลเมตรแรก 35 บาท

  if (km > 1) {
    const tiers = [
      { limit: 10, rate: 6.5 },
      { limit: 20, rate: 7.0 },
      { limit: 40, rate: 8.0 },
      { limit: 60, rate: 8.5 },
      { limit: 80, rate: 9.0 },
      { limit: Infinity, rate: 10.5 },
    ];

    let currentKm = 1;

    for (const tier of tiers) {
      if (km > currentKm) {
        const distanceInTier = Math.min(km, tier.limit) - currentKm;
        fare += distanceInTier * tier.rate;
        currentKm = tier.limit;
      } else {
        break;
      }
    }
  }

  if (minutes > 0) {
    fare += minutes * 3;
  }

  return Math.round(fare);
}

export default function TaxiFareScreen() {
  const [distance, setDistance] = useState("");
  const [trafficTime, setTrafficTime] = useState("");
  const [fare, setFare] = useState<number | null>(null);

  const handleCalculate = () => {
    const km = parseFloat(distance);
    const mins = parseFloat(trafficTime) || 0;

    if (isNaN(km) || km < 0) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกระยะทางที่ถูกต้อง");
      return;
    }
    if (mins < 0) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกเวลารถติดที่ถูกต้อง");
      return;
    }

    setFare(calculateFare(km, mins));
  };

  const handleReset = () => {
    setDistance("");
    setTrafficTime("");
    setFare(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* ส่วนหัวยึดติดด้านบนสุดเพื่อความสวยงาม */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Taxi Fare</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* รูปภาพแท็กซี่คันใหญ่ตรงกลาง */}
        <Image
          source={require("../assets/images/taxi.png")}
          style={styles.taxiImage}
          resizeMode="contain"
        />

        {/* ชื่อหัวข้อเรื่อง */}
        <Text style={styles.cardTitle}>คำนวณค่าโดยสารแท็กซี่</Text>

        {/* ช่องกรอก ระยะทาง */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ระยะทาง (กิโลเมตร) 🛣️</Text>
          <TextInput
            style={styles.input}
            placeholder="กรุณากรอกระยะทาง"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
          />
        </View>

        {/* ช่องกรอก เวลารถติด */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>เวลารถติด (นาที) ⏰</Text>
          <TextInput
            style={styles.input}
            placeholder="กรุณากรอกเวลารถติด"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={trafficTime}
            onChangeText={setTrafficTime}
          />
        </View>

        {/* ปุ่มคำนวณค่าโดยสารสีเหลืองส้ม */}
        <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
          <Text style={styles.calcButtonText}>คำนวณค่าโดยสาร</Text>
        </TouchableOpacity>

        {/* ปุ่มยกเลิกสีเทา */}
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>ยกเลิก</Text>
        </TouchableOpacity>

        {/* กล่องสีเหลืองพาสเทลแสดงผลลัพธ์สุทธิ */}
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>ค่าโดยสารแท็กซี่</Text>
          <Text style={styles.resultValue}>
            {fare !== null ? fare.toFixed(2) : "0.00"}
          </Text>
          <Text style={styles.resultUnit}>บาท</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const YELLOW = "#F5A623";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9FE", // สีพื้นหลังชมพูอ่อนระเรื่อตามภาพตัวอย่าง
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  header: {
    backgroundColor: "#FFC715", // สีเหลืองสดของ Header ด้านบนสุด
    paddingTop: 50,
    paddingBottom: 16,
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
  },
  taxiImage: {
    width: 200,
    height: 180,
    marginTop: 24,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 24,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: "#000",
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#A4A4A4", // ขอบเส้นสีเทาบางตามสไตล์ในรูปภาพ
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
    backgroundColor: "#fff", // พื้นหลังกล่องอินพุตสีขาวล้วน
  },
  calcButton: {
    backgroundColor: "#FFBF00", // สีเหลืองทองสว่างของปุ่มคำนวณ
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  calcButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#A2A2A2", // ปุ่มยกเลิกพื้นหลังสีเทาเต็มผืนตามภาพ
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 18,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultCard: {
    backgroundColor: "#FFEFC4", // สีเหลืองครีมพาสเทลของกล่องสรุปราคา
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
    marginTop: 6,
  },
  resultLabel: {
    fontSize: 16,
    color: "#564C36",
    fontWeight: "600",
    marginBottom: 6,
  },
  resultValue: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#FF4D4D", // สีส้มอมแดงเด่นๆ ตรงตัวเลขราคามิเตอร์ตามภาพต้นฉบับ
    lineHeight: 52,
  },
  resultUnit: {
    fontSize: 16,
    color: "#564C36",
    fontWeight: "600",
    marginTop: 4,
  },
});
