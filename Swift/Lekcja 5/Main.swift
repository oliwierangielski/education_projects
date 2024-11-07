// Zadanie 1.
struct wordCount {
    var key: String
    var count: Int = 0
}

func zadanie1(){
    print("\nZadanie 1\n")
    var arr:[wordCount] = []
    for _ in (0..<1000){
        var word = ""
        word.append(Character(UnicodeScalar(Int.random(in: 65...70))!))
        word.append(Character(UnicodeScalar(Int.random(in: 65...70))!))
        word.append(Character(UnicodeScalar(Int.random(in: 65...70))!))    
        print(word, terminator: ", ")
        if let index = (arr.firstIndex{$0.key == word}) {
            arr[index].count+=1
        } else {
            arr.append(wordCount(key: word, count: 1))
        }
    }
    print("\n\n\n\n")
    arr.forEach { value in
        print(value.key," - ", value.count)
    }
}


// Zadanie 2
func zadanie2(){
    func toInt(paramArr: [Any]) -> [Int] {
        print("\nZadanie 2\n")
        var intArr: [Int] = []
        paramArr.forEach { value in
                if(value is Int){
                    intArr.append(value as! Int)
                }
        }
        return intArr
    }
    print(toInt(paramArr: [10, 12, 4, "d", 73.9, "kk"]))
}


// Zadanie 3

// func zadanie3(){
//     var array: [[Int]] = [[Int]]()
//     print("Podaj szerokość tablicy: ")
//     var width = readLine() ?? ""
//     print("Podaj wysokość tablicy: ")
//     var height = readLine() ?? ""
//     for var i in (0..<(Int(height) ?? 0 )){
//         print("Wiersz  \(i+1)")
//         for var y in (0..<(Int(width) ?? 0)){
//             print("Podaj \(y+1) element: ")
//             var input = readLine() ?? ""
//             array[i][y] = Int(input)!
//         }
//     }
// }

func zadanie3(){
    func rotateArray(){


    }
    array: [Int] = []
    print("Podaj rozmiar tablicy: ")
    var size = readLine() ?? ""
    for i in(0..<Int(size)!){
        array.append()
    }
}



// Zadania odpalenie
zadanie1()
zadanie2()
zadanie3()
