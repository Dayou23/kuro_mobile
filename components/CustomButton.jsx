import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  otherStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] flex flex-row justify-center items-center   ${otherStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`font-bold text-lg ${textStyles} `}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
