import { View, StyleSheet, Button, Dimensions, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import SharedHeader from "../../components/shared/SharedHeader";
import HomeBanner from "../../components/shared/HomeBanner";
import QuranButton from "../../components/home/QuranButton";
import ButtonLists from "../../components/home/ButtonLists";
import { Stack } from "expo-router";
import PagerView from "react-native-pager-view";
import SalahTime from "../../components/home/SalahTime";

const { width: screenWidth } = Dimensions.get("window"); // Get screen width

export default function index() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (event: { nativeEvent: { position: number } }) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const goToPage = (page: number) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(page);
      setCurrentPage(page); // Update current page state
    }
  };

  const renderIndicator = () => {
    const numPages = 2; // Number of pages in the pager view
    const indicatorWidth = 20;
    const indicatorMargin = 5;

    return (
      <View style={styles.indicatorContainer}>
        {Array.from({ length: numPages }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicatorDot,
              {
                width: indicatorWidth,
                height: indicatorWidth,
                borderRadius: indicatorWidth / 2,
                backgroundColor: index === currentPage ? "#a89075" : "gray",
                marginHorizontal: indicatorMargin,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const myPager = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        <PagerView
          style={styles.pager}
          initialPage={0}
          onPageSelected={handlePageChange}
          ref={pagerRef}
        >
          <View style={styles.page} key={1}>
            <View style={{ flex: 1 }}>
              <ButtonLists />
            </View>
          </View>
          <View style={styles.page} key={2}></View>
        </PagerView>
        {renderIndicator()}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerShown: true,
          header: () => (
            <SharedHeader
              title="الرئيسية"
              fontSize={17}
              isBackIcon="none"
              isSettings="flex"
            />
          ),
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <HomeBanner isSalah="flex" isDateShowen="none" />
        <SalahTime isSalah="flex" isDateShowen="none" />
        <QuranButton />
        {myPager()}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  //#3e6b66
  container: {
    flex: 1,
    backgroundColor: "#f0ebdd",
  },
  pager: {
    minHeight: 265,
  },
  page: {
    flex: 1,
    justifyContent: "center",
  },

  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  indicatorDot: {
    width: 5,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: "gray",
    borderWidth: 1,
    borderColor: "lightgray",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
