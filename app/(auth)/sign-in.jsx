import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signInFun, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const signIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    // router.replace("/sign-in");
  };

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    } else {
      setSubmitting(true);
      try {
        await signInFun(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLogged(true);
        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };
  return (
    <SafeAreaView className="h-full">
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
          <Text className="text-3xl font-bold  mt-10">Login </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            placeholder="email"
            keyboardType="email-address"
            otherStyles="my-2"
          />
          <FormField
            title="Password"
            type="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="password"
            otherStyles="my-2"
          />
          <CustomButton
            handlePress={submit}
            title="login"
            otherStyles="w-full mt-7 bg-primary"
            textStyles="text-slate-100"
            isLoading={isSubmitting}
          />
          <TouchableOpacity
            onPress={logout}
            className="flex w-full items-end mb-10"
          >
            <Text className="text-lg text-gray-800">SignOut</Text>
          </TouchableOpacity>
          <View className="flex flex-row gap-2 mt-0 items-center">
            <Text className="text-lg text-gray-800">Not a member?</Text>
            <Link href="/sign-up" className="text-lg font-semibold text-black">
              Signup now
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
