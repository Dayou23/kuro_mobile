import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center p-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[150px] h-[150px]"
      />

      <Text className="text-sm font-pmedium text-gray-900">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-black mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
