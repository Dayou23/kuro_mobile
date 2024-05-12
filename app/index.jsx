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
              Discover Endless{"\n"}
              Possibilities with <Text className="text-primary">Kuro</Text>
            </Text>
          </View>
          <Text className="text-sm font-medium text-gray-700 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
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
