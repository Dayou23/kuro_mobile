import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
  RefreshControl,
} from "react-native";

import { icons, images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import InfoBox from "../../components/InfoBox";
import { useState } from "react";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            username={(user && user.username) || ""}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Posts Found"
            subtitle="No posts found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full mt-6 mb-12 px-4">
            <View className="flex flex-row justify-between items-center mb-10">
              <TouchableOpacity onPress={() => router.replace("/home")}>
                <Image
                  source={images.kuraLogo}
                  className="w-[100px] h-[40px] "
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                className="flex flex-row items-center "
              >
                {/* <Text className="text-red-500 font-bold">LOGOUT </Text> */}
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>

            <View className="flex items-center">
              <View className="flex flex-row mb-3">
                <View className="w-16 h-16  rounded-full flex justify-center items-center">
                  <Image
                    source={{ uri: user?.avatar }}
                    className="w-[100%] h-[100%] rounded-full"
                    resizeMode="cover"
                  />
                </View>

                <View className="flex justify-around ml-3 ">
                  <Text className="text-lg text-black font-semibold">
                    {user?.username}
                  </Text>
                  <Text className="text-lg text-gray-800 font-medium">
                    {posts.length || 0} poste
                  </Text>
                </View>
              </View>
              <View className="flex flex-row gap-5">
                <TouchableOpacity className="flex flex-row items-center  border border-teal-700 p-1 ">
                  <Text className="font-bold text-primary text-center">
                    Edit profile
                  </Text>
                  <Image
                    source={icons.edit}
                    className="w-5 h-4"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row items-center bg-red-500 border border-red-500 p-1 ">
                  <Text className="font-bold text-white text-center">
                    Delet profile
                  </Text>
                  <Image
                    source={icons.deleteIcon}
                    className="w-5 h-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#161622"
        translucent={true}
      /> */}
    </SafeAreaView>
  );
};

export default Profile;
