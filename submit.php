<?php

header('Content-Type: text/html; charset=utf-8');
// 设置默认时区为北京时间
date_default_timezone_set('Asia/Shanghai');


// 数据库连接配置
$servername = "localhost"; // 数据库服务器地址
$username = "root"; // 数据库用户名
$password = ""; // 数据库密码
$dbname = "shoppingsite"; // 数据库名称

// 获取POST请求中的数据
// $cart = isset($_POST['cart']) ? $_POST['cart'] : null;
// $userToken = isset($_POST['userToken']) ? $_POST['userToken'] : null;

// 使用filter_input函数获取POST数据并进行过滤和验证
$cart = filter_input(INPUT_POST, 'cart', FILTER_SANITIZE_STRING);
$userToken = filter_input(INPUT_POST, 'userToken', FILTER_SANITIZE_STRING);

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    die("Connection failed. Please try again later.");
}
// 检查是否接收到cart和userToken数据
if ($cart !== null && $userToken !== null) {
    checkUser($userToken);
} else {
    echo "<h1>Error</h1>";
    echo "<p>Invalid data received</p>";
}

function checkUser($token): void
{
    global $conn;
    // 查询 userdata 表中的数据
    $sql = "SELECT userToken FROM userdata";
    $result = $conn->query($sql);

    // 检查查询结果
    if ($result->num_rows > 0) {
        // 输出数据
        while ($row = $result->fetch_assoc()) {
            if ($token == $row["userToken"]) {
                //if(other authentication is successful)
                postOrder();
            } else {
                echo "token dismatch";
            }
        }
    } else {
        echo "token dismatch";
    }
}
function postOrder(): void
{
    global $conn;
    global $cart;

    // 生成10位的订单编号
    $orderNumber = generateOrderNumber();
    echo "Generated Order Number: " . $orderNumber . "<br>";

    // 获取用户ID（假设用户ID通过POST请求传递）
    //$userID = $_POST['userID'];
    $userID = 1234567890;

    // 获取订单时间
    $orderTime = date('Y-m-d H:i:s');

    // 获取总价格（假设总价格通过POST请求传递）
    $totalPrice = calTotalPrice();

    $rawOrder = $cart;
    //echo "Raw Order: " . $rawOrder;

    // 插入订单数据到 userorder 表
    $sql = "INSERT INTO userorder (orderNumber, UserID , OrderDate, TotalPrice, rawOrder) VALUES (?, ?, ?, ?, ?)";
    //this php is written by ziyi li
    $stmt = $conn->prepare($sql);
    //bind_param("iisd"限定了參數類型，用於防止sql注入
    $stmt->bind_param("sisds", $orderNumber, $userID, $orderTime, $totalPrice, $rawOrder);

    if ($stmt->execute()) {
        echo "Order placed successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}
function generateOrderNumber($length = 10)
{
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
function calTotalPrice(): int
{
    global $cart;
    $totalPrice = 0;
    $cartData = json_decode($cart, true);
    foreach ($cartData as $item) {
        //print_r($item) . "<br>";
        $totalPrice += $item['productPrice'] * $item['productQuantity'];
    }
    //echo "Total Price: " . $totalPrice . "<br>";
    return $totalPrice;

}

// 关闭数据库连接
$conn->close();

?>