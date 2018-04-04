SELECT restaurant_profiles.name, restaurant_profiles.logo_url, orders.* FROM
restaurant_profiles JOIN Orders
ON (restaurant_profiles.user_id = orders.restaurant_id)
WHERE customer_id = $1 AND open = true;