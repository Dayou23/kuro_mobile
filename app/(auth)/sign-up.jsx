import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const signUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    conformPasssword: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    } else {
      if (form.conformPasssword !== form.password) {
        Alert.alert("Error", "passzord did not match");
      } else {
        setSubmitting(true);
        try {
          const result = await createUser(
            form.email,
            form.password,
            form.username
          );
          setUser(result);
          router.replace("/home");
        } catch (error) {
          Alert.alert("Error", error.message);
        } finally {
          setSubmitting(false);
        }
      }
    }
  };

  return (
    <SafeAreaView className=" h-full">
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
          <Text className="text-3xl font-bold  mt-10">Create acount </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            placeholder="username"
            otherStyles="my-2"
          />
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
          <FormField
            title="Conform password"
            type="Password"
            value={form.conformPasssword}
            handleChangeText={(e) => setForm({ ...form, conformPasssword: e })}
            placeholder="conform password"
            otherStyles="my-2"
          />
          <CustomButton
            handlePress={submit}
            title="signup"
            otherStyles="w-full mt-7 bg-primary"
            textStyles="text-slate-100"
            isLoading={isSubmitting}
          />
          <View className="flex flex-row gap-2 mt-0 items-center">
            <Text className="text-lg text-gray-800">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-semibold text-black">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;
