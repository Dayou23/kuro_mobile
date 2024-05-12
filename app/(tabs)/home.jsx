import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className=" h-full">
      <View className="flex my-6 px-4 space-y-6 ">
        <View className="flex justify-between items-start flex-row mb-6">
          <Image
            source={images.kuraLogo}
            className="w-[180px] h-[84px] "
            resizeMode="contain"
          />
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            username={(user && user.username) || ""}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Posts Found" subtitle="No posts created yet" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
