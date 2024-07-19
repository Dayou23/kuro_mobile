import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  type = !type && "text",
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-slate-800 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-gray-200 rounded-2xl border-2 focus:border-primary  flex flex-row items-center">
        <TextInput
          className="flex-1 font-medium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8bbf"
          cursorColor="#008081"
          onChangeText={handleChangeText}
          secureTextEntry={type === "Password" && !showPassword}
          {...props}
        />

        {type === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
