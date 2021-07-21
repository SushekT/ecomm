from django.core.checks import messages
from django.shortcuts import render
from rest_framework import serializers
from rest_framework import permissions
from base.products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Reviews

from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    print(query)
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products, 4)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    serializer = ProductSerializer(products, many=True)

    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=2).order_by('-rating')[0:3]
    serializers = ProductSerializer(products, many=True)
    return Response(serializers.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createtProducts(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStocks=0,
        category='Sample Category',
        description='sdhashdgashdgajsd'

    )
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editProducts(request, pk):
    data = request.data

    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.countInStocks = data['countInStocks']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):

    data = request.data
    print(data)
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')

    product.save()

    return Response('Image Was Uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user

    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 Review Check already exist
    alreadyExist = product.reviews_set.filter(user=user).exists()

    if alreadyExist:
        content = {'detail': 'Product Already Reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No rating or 0

    elif data['rating'] == 0:
        content = {'detail': 'Please select the rating here'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 Create Review
    else:
        review = Reviews.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        reviews = product.reviews_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

            product.rating = total / len(reviews)
        product.save()

        return Response('Successful')
