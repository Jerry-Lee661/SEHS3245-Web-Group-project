<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Receipt</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
    h2 {
        text-align: center;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    table, th, td {
        border: 1px solid #ccc;
    }
    th, td {
        padding: 8px;
        text-align: left;
    }
</style>
</head>
<body>

    <header>
        <div class="logo"></div> <!-- 公司图标 -->
        <div class="company-info">
            <h1>Company Name</h1>
            <p>The company's development direction and goals, etc.</p> <!-- 公司的发展方向目标等 -->
        </div>
        <div class="button-group">
        <a href="shopping_page_url" class="button">Shopping Page</a> <!-- 购物页面 -->
        <a href="cart_page_url" class="button">Cart</a> <!-- 购物车 -->
        <a href="homepage_url" class="button">Home</a> <!-- 首页 -->
    </div>
</header>

<div class="container">
    <h2>Receipt</h2>
    <table>
        <tr>
            <th>Product</th>
            <th>Price</th>
        </tr>
        <?php
        $products = $_POST['products'];
        $total = 0;
        foreach ($products as $product) {
            echo "<tr>";
            echo "<td>{$product['name']}</td>";
            echo "<td>{$product['price']}</td>";
            echo "</tr>";
            $total += $product['price'];
        }
        ?>
        <tr>
            <th>Total</th>
            <td><?php echo $total; ?></td>
        </tr>
    </table>
    <p>Thank you for shopping with us!</p>
</div>
</body>
</html>