import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlashList, ViewToken } from "@shopify/flash-list";
import hafs from "../../assets/json/hafs.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

interface Verse {
  id: number;
  jozz: number;
  sura_no: number;
  sura_name_en: string;
  sura_name_ar: string;
  page: number;
  line_start: number;
  line_end: number;
  aya_no: number;
  aya_text: string;
  aya_text_emlaey: string;
}

type StateFunctionsFromParent = {
  CurrentSuraName: (sura: string) => void;
  CurrentJozz: (jozz: number) => void;
  chapterId: number | null; // Add chapterId prop
};

const Separator = memo(({ suraName }: { suraName: string }) => (
  <View style={styles.separator}>
    <View style={styles.separator1}>
      <Text style={styles.separatorText}>{suraName}</Text>
    </View>
    <Text style={styles.basmlah}>بسم الله الرحمن الرحيم</Text>
  </View>
));

export default function QuranList({
  CurrentSuraName,
  CurrentJozz,
  chapterId

}: StateFunctionsFromParent) {
  const groupedHafs = useMemo(() => {
    return hafs.reduce((acc: Record<number, Verse[]>, verse) => {
      (acc[verse.page] = acc[verse.page] || []).push(verse);
      return acc;
    }, {});
  }, [hafs]);

  const groupedPages = useMemo(() => Object.values(groupedHafs), [groupedHafs]);
  const [highlightedAyas, setHighlightedAyas] = useState<
    Record<string, number | null>
  >({});
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const [suraNamesOnPages, setSuraNamesOnPages] = useState<
    Record<number, string>
  >({}); // Store sura names for each page
  
  const [currentPage, setCurrentPage] = useState(
    chapterId ? hafs.find(verse => verse.sura_no === chapterId)?.page : 1 // Direct comparison
);
  useEffect(() => {
    if (chapterId) { // Check if chapterId exists
        const initialPage = hafs.find(verse => verse.sura_no === chapterId)?.page || 1;
        setCurrentPage(initialPage);
    } else if (groupedPages.length > 0 && groupedPages[0].length > 0) {
        // If no chapterId is passed, render first page by default
        setCurrentPage(groupedPages[0][0].page);
    }
}, [chapterId, groupedPages]); // Add chapterId to the dependency array

  useEffect(() => {
    if (groupedPages.length > 0) {
      const initialSuraNames = groupedPages.reduce(
        (acc: Record<number, string>, page) => {
          acc[page[0].page] = page[0].sura_name_ar;
          return acc;
        },
        {}
      );
      setSuraNamesOnPages(initialSuraNames);
    }
  }, [groupedPages]);
  useEffect(() => {
    if (groupedPages.length > 0 && groupedPages[0].length > 0) {
      CurrentSuraName(groupedPages[0][0].sura_name_ar);
      CurrentJozz(groupedPages[0][0].jozz);
    }
  }, [groupedPages, CurrentSuraName, CurrentJozz]);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const updatedSuraNames = viewableItems.reduce(
          (acc: Record<number, string>, viewableItem) => {
            const pageNumber = viewableItem.item[0].page;
            const suraName = viewableItem.item[0].sura_name_ar;
            acc[pageNumber] = suraName;
            return acc;
          },
          {}
        );
        setSuraNamesOnPages((prevSuraNames) => ({
          ...prevSuraNames,
          ...updatedSuraNames,
        }));

        const firstVisibleItem = viewableItems[0];
        const suraNameAr = firstVisibleItem.item[0]?.sura_name_ar;
        const jozz = firstVisibleItem.item[0]?.jozz;

        CurrentSuraName(suraNameAr || "");
        CurrentJozz(jozz || 0);
      }
    },
    [CurrentSuraName, CurrentJozz]
  );
  // const handleViewableItemsChanged = useCallback(
  //   ({ viewableItems }: { viewableItems: ViewToken[] }) => {
  //     if (viewableItems.length > 0) {
  //       const firstVisibleItem = viewableItems[0];
  //       const suraNameAr = firstVisibleItem.item[0]?.sura_name_ar;
  //       const jozz = firstVisibleItem.item[0]?.jozz;
  //       CurrentSuraName(suraNameAr || "");
  //       CurrentJozz(jozz || 0);

  //     }
  //   },
  //   [CurrentSuraName, CurrentJozz]
  // );

  const { width, height } = Dimensions.get("window");

  const initialScrollIndex = useMemo(() => {
    return groupedPages.findIndex(page => page[0].page === currentPage);
  }, [groupedPages, currentPage]);


  const handleAyaPress = useCallback(
    (pageKey: string | number, ayaId: number | null) => {
      setHighlightedAyas((prev) => {
        const newHighlightedAyas = { ...prev };
        newHighlightedAyas[pageKey] =
          newHighlightedAyas[pageKey] === ayaId ? null : ayaId;
        return newHighlightedAyas;
      });
    },
    []
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlashList
        data={groupedPages}
        keyExtractor={(item, index) =>
          `${item[0].page}-${item[0].sura_no}-${index}`
        } // Unique key with index
        horizontal={true}
        estimatedItemSize={width}
        pagingEnabled={true}
        inverted
        alwaysBounceHorizontal
        extraData={highlightedAyas}
        viewabilityConfig={viewabilityConfig.current}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        initialScrollIndex={initialScrollIndex > -1 ? initialScrollIndex : undefined}

        renderItem={({ item }) => {
          const pageKey = `${item[0].page}-${item[0].sura_no}`;
          const highlightedAyaForPage = highlightedAyas[pageKey];
          const firstVerseOnPage = item[0];
          const currentPageSura = suraNamesOnPages[firstVerseOnPage.page];

          const previousPageNumber = firstVerseOnPage.page - 1;
          const previousPageSura = suraNamesOnPages[previousPageNumber];

          return (
            <View
              style={{
                width,
                height,
                backgroundColor: "#f0ebdd",
                elevation: 9,
              }}
              key={pageKey}
            >
              <View style={{  padding: 5, margin: 10, borderWidth:1 }}>
                {/* Top Separator (only if it's the first sura on the page AND we have sura data) */}
                {currentPageSura &&
                  (!previousPageSura || currentPageSura !== previousPageSura) &&
                  firstVerseOnPage.aya_no === 1 && (
                    <Separator suraName={firstVerseOnPage.sura_name_ar} />
                  )}

                {item
                  .reduce(
                    (
                      suraGroups: { sura: number; verses: Verse[] }[],
                      verse
                    ) => {
                      const lastGroup = suraGroups[suraGroups.length - 1];
                      if (lastGroup && lastGroup.sura === verse.sura_no) {
                        lastGroup.verses.push(verse);
                      } else {
                        suraGroups.push({
                          sura: verse.sura_no,
                          verses: [verse],
                        });
                      }
                      return suraGroups;
                    },
                    []
                  )
                  .map((suraGroup, index) => (
                    <View key={`${suraGroup.sura}-${pageKey}`}>
                      {/* Inner Separator (only if sura changes mid-page AND not the first group) */}
                      {index > 0 && (
                        <Separator
                          suraName={suraGroup.verses[0].sura_name_ar}
                        />
                      )}

                      <Text style={styles.ayaStyle}>
                        {suraGroup.verses.map((verse) => (
                          <Text
                            key={`${verse.id}-${pageKey}`}
                            style={[
                              styles.ayaStyle,
                              verse.id === highlightedAyaForPage
                                ? styles.highlightedAyaText
                                : null,
                            ]}
                            onPress={() => handleAyaPress(pageKey, verse.id)}
                          >
                            {verse.aya_text + " "}
                          </Text>
                        ))}
                      </Text>
                    </View>
                  ))}

                <Text style={{ textAlign: "center" }}>
                  {firstVerseOnPage.page}
                </Text>
              </View>
            </View>
          );
        }}
        // renderItem={({ item }) => {
        //   const pageKey = `${item[0].page}-${item[0].sura_no}`;
        //   const highlightedAyaForPage = highlightedAyas[pageKey];
        //   const firstVerseOnPage = item[0];
        //   const currentPageSura = suraNamesOnPages[firstVerseOnPage.page];

        //   const previousPageNumber = firstVerseOnPage.page - 1;
        //   const previousPageSura = suraNamesOnPages[previousPageNumber];

        //   const showSeparatorAtTop = (previousPageSura && currentPageSura !== previousPageSura) || (!previousPageSura && firstVerseOnPage.aya_no === 1);

        //   return (
        //     <View style={{ width, height, backgroundColor: "#f0ebdd", elevation: 9 }} key={pageKey}>
        //       <View style={{ flex: 1, padding: 5, margin: 10 }}>
        //         {showSeparatorAtTop && <Separator suraName={firstVerseOnPage.sura_name_ar} />}

        //         {item.reduce((suraGroups: { sura: number; verses: Verse[] }[], verse) => {
        //           const lastGroup = suraGroups[suraGroups.length - 1];
        //           if (lastGroup && lastGroup.sura === verse.sura_no) {
        //             lastGroup.verses.push(verse);
        //           } else {
        //             suraGroups.push({ sura: verse.sura_no, verses: [verse] });
        //           }
        //           return suraGroups;
        //         }, []).map((suraGroup, index) => (
        //           <View key={`${suraGroup.sura}-${pageKey}`}>
        //             {index > 0 && <Separator suraName={suraGroup.verses[0].sura_name_ar} />}
        //             <Text style={styles.ayaStyle}>
        //               {suraGroup.verses.map((verse) => (
        //                 <Text
        //                   key={`${verse.id}-${pageKey}`}
        //                   style={[
        //                     styles.ayaStyle,
        //                     verse.id === highlightedAyaForPage ? styles.highlightedAyaText : null,
        //                   ]}
        //                   onPress={() => handleAyaPress(pageKey, verse.id)}
        //                 >
        //                   {verse.aya_text + " "}
        //                 </Text>
        //               ))}
        //             </Text>
        //           </View>
        //         ))}

        //         <Text style={{ textAlign: "center" }}>{firstVerseOnPage.page}</Text>
        //       </View>
        //     </View>
        //   );
        // }}
        // renderItem={({ item, index }) => {
        //   const pageKey = `${item[0].page}-${item[0].sura_no}-${index}`;
        //   const highlightedAyaForPage = highlightedAyas[pageKey];
        //   const firstVerseOnPage = item[0];
        //   const lastVerseOnPage = item[item.length - 1];

        //   return (
        //     <View style={{ width, height, backgroundColor: "#f0ebdd", elevation: 9 }} key={pageKey}>
        //       <View style={{ flex: 1, padding: 5, margin: 10 }}>
        //         {/* Display separator at the beginning of the new sura */}
        //         {firstVerseOnPage.aya_no === 1 && (
        //           <Separator suraName={firstVerseOnPage.sura_name_ar} />
        //         )}
        //         <Text style={styles.ayaStyle}>
        //           {item.map((verse) => (
        //             <Text
        //               key={`${verse.id}-${pageKey}`}
        //               style={verse.id === highlightedAyaForPage ? styles.highlightedAyaText : null}
        //               onPress={() => handleAyaPress(pageKey, verse.id)}
        //             >
        //               {verse.aya_text + " "}
        //             </Text>
        //           ))}
        //         </Text>
        //         {/* Display separator at the end of the last page of the previous sura */}
        //         {lastVerseOnPage.aya_no === 1 && lastVerseOnPage.sura_no !== firstVerseOnPage.sura_no && (
        //           <Separator suraName={lastVerseOnPage.sura_name_ar} />
        //         )}
        //         <Text style={{ textAlign: "center" }}>{index + 1}</Text>
        //       </View>
        //     </View>
        //   );
        // }}
        // renderItem={({ item, index }) => {
        //   // const combinedText = item.map((verse) => verse.aya_text).join(" "); // More efficient string concatenation
        //   const pageKey = `${item[0].page}-${item[0].sura_no}-${index}`;
        //   const highlightedAyaForPage = highlightedAyas[pageKey];

        //   return (
        //     <View
        //       style={{
        //         width,
        //         height,
        //         backgroundColor: "#f0ebdd",
        //         elevation: 9,
        //       }}
        //       key={`${item[0].page}-${item[0].sura_no}-${index}`} // Unique key with index
        //     >
        //       <View
        //         style={{
        //           flex: 1,
        //           padding: 5,
        //           margin: 10,
        //         }}
        //       >

        //         <Text style={styles.ayaStyle}>
        //           {item.map((verse) => (

        //             <Text
        //             key={`${verse.id}-${pageKey}`} // KEY CHANGE HERE
        //               style={
        //                 verse.id === highlightedAyaForPage
        //                   ? styles.highlightedAyaText
        //                   : null
        //               }
        //               onPress={() => handleAyaPress(pageKey, verse.id)}
        //             >
        //               {verse.aya_text + " "}
        //             </Text>
        //           ))}
        //         </Text>
        //         <Text style={{ textAlign: "center" }}>{index + 1}</Text>
        //       </View>
        //     </View>
        //   );
        // }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  ayaContainer: {
    marginVertical: 5,
    padding: 5,
  },
  highlightedAya: {
    backgroundColor: "#f0ebdd",
  },
  ayaStyle: {
    direction: "rtl",
    fontFamily: "HafsSmart",
    fontSize: 18,
    marginHorizontal: 20,
    textAlign: "justify",
  },
  highlightedAyaText: {
    backgroundColor: "#e0e0e0",
  },
  separator: {
    alignItems: "center",
    marginVertical: 10,
  },
  separator1: {
    width:"100%",
    backgroundColor: "lightgray",
    padding: 10,
    alignItems: "center",
  },
  basmlah:{
    fontSize: 20,
    fontFamily: "uthmanic_hafs",
  },
  separatorText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
