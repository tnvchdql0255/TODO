import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";

export default function App() {
  const [myTextInput, setMyTextInput] = useState("");
  //텍스트 인풋 제어 스테이트
  const [todoList, setTodoList] = useState([]);
  const [bg, setBg] = useState({ backgroundColor: "#fefefe" });
  //ToDo 리스트 앞 표시
  const [is, setis] = useState(false);
  function onChangeInput(event) {
    console.log("event", event);
    setMyTextInput(event); // 텍스트 인풋을 받고, 그 인풋을 MyTextInput에 집어넣고 render()
  }

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  function onAddTextInput() {
    setTodoList((current) => [
      ...current,
      { key: todoList.length, text: myTextInput },
    ]);

    setMyTextInput("");
  }
  function removeLabel(idx) {
    console.log(idx);
    for (let i = 0; i < todoList.length; i++) {
      //idx: 리스트에서 하나만 받은데이터
      //todoList: 리스트 전체 데이터
      if (idx.item.text == todoList[i].text) {
        console.log(`${i} 에서 데이터 찾음`);
        setTodoList(
          (current) =>
            current.filter((c) => {
              return c.text !== idx.item.text;
            }) //자바스크립트.. 왜 배열 아이템 삭제기능이 이따위야..
        );
      }
    }
  }
  function changeColor() {
    setBg({
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
  }
  useEffect(() => {
    console.log(bg);
  }, [bg]);
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("./comp/default.jpg")}
        style={styles.bgImage}
      >
        <SafeAreaView style={styles.root_box}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginBottom: 8,
            }}
          >
            dork Todo list
          </Text>
          <SwipeListView
            data={todoList}
            renderItem={(data) => (
              <View style={[styles.text_style, bg]}>
                <Text>{data.item.text}</Text>
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.swipeHiddenItemContainer}>
                <TouchableOpacity onPress={changeColor}>
                  <View style={styles.swipeHiddenItem}>
                    <Text
                      style={[{ fontWeight: "bold" }]}
                      onPress={() => alert("dummycode..")}
                    >
                      setColor
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeLabel(data)}>
                  <View style={[styles.swipeHiddenItem]}>
                    <Text style={[{ fontWeight: "bold" }]}>Remove</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={70}
            rightOpenValue={-70}
          ></SwipeListView>

          <TextInput
            style={styles.input}
            value={myTextInput}
            onChangeText={onChangeInput}
            multiline={true}
            editable={true}
            placeholder="write todo here"
            placeholderTextColor="#cccccc"
          ></TextInput>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.styledBtn} onPress={changeColor}>
              <Text>CHANGE LIST Color</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.styledBtn} onPress={onAddTextInput}>
              <Text>Add Todo</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  styledBtn: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "orange",
    margin: 8,
  },
  bgImage: {
    flex: 1,
  },
  main_Box: {
    alignItems: "center",
    backgroundColor: "#a0a0a0",
  },
  swipeHiddenItemContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
    flexDirection: "row",
    borderRadius: 20,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  swipeHiddenItem: {
    width: 70,
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text_style: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
    borderRadius: 20,
    opacity: 1,
  },
  input: {
    width: "100%",
    minWidth: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    marginTop: 20,
    fontSize: 25,
    padding: 10,
    alignItems: "center",
  },
  root_box: {
    minWidth: "100%",
    minHeight: "100%",
    alignSelf: "center",
    padding: 25,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  scroll_view: {
    minHeight: "50%",
    maxHeight: "75%",
  },
});
