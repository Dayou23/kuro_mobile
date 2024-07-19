import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import Loader from "../components/Loader";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.kuraLogo}
            className="w-[180px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.shopAI}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-black font-bold text-center">
              {/* Hi, and welcome to the <Text className="text-primary">Kuro</Text>{" "}
              platform. */}
              Explore the latest tech trends and innovations with us!
            </Text>
          </View>
          <Text className="text-sm font-medium text-gray-700 mt-7 text-center">
            Experience the forefront of technology at our upcoming IT event!
            Dive into cutting-edge innovations, engage with experts, and network
            with peers. Don't miss your chance to shape the future of digital
            technology!
          </Text>
          <CustomButton
            title="Continue"
            handlePress={() => router.push("/sign-in")}
            otherStyles="w-full mt-7 bg-primary"
            textStyles="text-slate-100"
          />
        </View>
      </ScrollView>
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
}
