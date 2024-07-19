import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, searchPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { images } from "../../constants";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: queryPosts, refetch } = useAppwrite(() => searchPosts(query));
  const { data: posts } = useAppwrite(getAllPosts);
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className=" h-full">
      <View className="flex mt-6 px-4 ">
        <View className="flex justify-between items-start flex-row ">
          <Image
            source={images.kuraLogo}
            className="w-[180px] h-[84px] "
            resizeMode="contain"
          />
        </View>
      </View>
      <FlatList
        data={query ? queryPosts : posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex mb-6 px-4">
              <View className="mt-6 mb-2">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
              {query && (
                <>
                  <Text className="font-pmedium text-gray-900 text-sm">
                    Search Results
                  </Text>
                  <Text className="text-2xl font-psemibold text-black mt-1">
                    {query}
                  </Text>
                </>
              )}
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Posts Found"
            subtitle="No posts found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
