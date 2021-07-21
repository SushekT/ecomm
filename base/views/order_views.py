from django.core.checks import messages
from django.shortcuts import render
from rest_framework import serializers
from rest_framework import permissions
from rest_framework import response
from base.products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress

from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status

from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):

    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No order Item'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        # (1) Create Order
        order = Order.objects.create(
            user=user,
            payment_method=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],

        )

        # (2) Create Shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            Country=data['shippingAddress']['country']

        )

        # (3) Create Order

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

        # (4) Update Stock
            product.countInStocks = product.countInStocks - int(item.qty)
            product.save()
        serializers = OrderSerializer(order, many=False)
        return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user
    
    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializers = OrderSerializer(order, many=False)
            return Response(serializers.data)

        else:
            return Response({'detail': 'Not Authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)

    except:
        print('error')
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrder(request):
    user = request.user
    orders = user.order_set.all()
    serializers = OrderSerializer(orders, many=True)
    return Response(serializers.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderedToPaid(request, pk):

    order = Order.objects.get(_id=pk)
    print(order.isPaid)
    order.isPaid = True
    print(order.isPaid)
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was Paid')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrder(request):
    orders = Order.objects.all()
    serializers = OrderSerializer(orders, many=True)
    return Response(serializers.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderedToDelivered(request, pk):

    order = Order.objects.get(_id=pk)
    print(order)
    order.isDeivered = True

    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was Delivered')



