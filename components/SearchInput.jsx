import { useState } from "react";
import { router } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-primary">
      <TextInput
        className="text-base mt-0.5 text-b flex-1 font-pregular"
        cursorColor="#008081"
        value={query}
        placeholder="Search a post"
        placeholderTextColor="gray"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please write something to search"
            );
          router.setParams({ query });
        }}
      >
        <Image
          source={icons.search3}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
