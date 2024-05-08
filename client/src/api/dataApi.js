import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const dataAPI = createApi({
    reducerPath: 'data-api-reducer',
    tagTypes: ["customers", "productsCount", "customersCount", "countOrders", "totalIncome", "order", "team", "allTags", "product", "user", "status"],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ordering-system-br9g.onrender.com/' }),
    endpoints: builer => ({

        // user
        createUser: builer.mutation({
            query: (body) => ({
                url: 'user/register',
                method: 'post',
                body: body
            }),
            invalidatesTags: [{ type: 'user', id: 'LIST' }]
        }),

        userLogin: builer.mutation({
            query: (body) => ({
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                url: 'user/login',
                method: 'post',
                body: body
            }),
            invalidatesTags: [{ type: 'user', id: 'LIST' }]
        }),

        loginStatus: builer.query({
            query: (jwt) => ({
                url: 'user/loginStatus',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Status: ", result);
                return ['user'];
            }
        }),

        loginOut: builer.mutation({
            query: () => ({
                url: 'user/logout',
                method: 'post'
            }),
            invalidatesTags: [{ type: 'user', id: 'LIST' }]
        }),


        // customer
        createCustomer: builer.mutation({
            query: (body) => ({
                url: 'customer/create',
                method: 'post',
                body: body
            }),
            invalidatesTags: [{ type: 'customers', id: 'LIST' }]
        }),

        getAllCustomers: builer.query({
            query: () => ({
                url: 'customer/getAllCustomers',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                const allTags = result ? [...result.result.map((ele) => ({ type: 'customers', id: ele.id })), { type: 'customers', id: 'LIST' }] : [{ type: 'customers', id: 'LIST' }]
                console.log('All data provide tag: ', allTags)
                return allTags
            },
        }),

        getCustomer: builer.query({
            query: (id) => ({
                url: `customer/getCustomer/${id}`,
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Customer: ", result);
                return ['customers']
            }
        }),

        updateCustomer: builer.mutation({
            query: (data) => ({
                url: `customer/update/${data.id}`,
                method: 'put',
                body: data.body
            }),
            invalidatesTags: [{ type: 'customers', id: 'LIST' }]
        }),

        deleteCustomer: builer.mutation({
            query: (id) => ({
                url: `customer/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: [{ type: 'customers', id: 'LIST' }]
        }),

        countCustomers: builer.query({
            query: () => ({
                url: 'customer/count',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Data: ", result)
                return ["customersCount"]
            }
        }),

        // product
        getAllProducts: builer.query({
            query: () => ({
                url: 'product/getAllProducts',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                const allTags = result ? [...result.response.map((ele) => ({ type: 'product', id: ele.id })), { type: 'product', id: 'LIST' }] : [{ type: 'product', id: 'LIST' }]
                return allTags
            }
        }),

        createProduct: builer.mutation({
            query: (body) => ({
                url: 'product/create',
                method: 'post',
                body: body
            }),
            invalidatesTags: [{ type: 'product', id: 'LIST' }]
        }),

        countProducts: builer.query({
            query: () => ({
                url: 'product/count',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Data: ", result)
                return ["productsCount"]
            }
        }),


        //  order
        getAllOrders: builer.query({
            query: () => ({
                url: 'order/getAllOrders',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log(result);
                const allTags = result ? [...result.response.map((ele) => ({ type: 'order', id: ele.id })), { type: 'order', id: 'LIST' }] : [{ type: 'order', id: 'LIST' }]
                console.log('All data provide tag: ', allTags)
                return allTags
            },
        }),

        getOrder: builer.query({
            query: (id) => ({
                url: `order/getOrder/${id}`,
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Data: ", result)
                return ["order"]
            }
        }),

        countOrders: builer.query({
            query: () => ({
                url: 'order/count',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Data: ", result)
                return ["countOrders"]
            }
        }),

        totalIncome: builer.query({
            query: () => ({
                url: 'order/totalIncome',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Data: ", result)
                return ["totalIncome"]
            }
        }),

        chnageOrderStatus: builer.mutation({
            query: (data) => ({
                url: `order/status/${data.id}`,
                method: 'put',
                body: data.body
            }),
            invalidatesTags: (result, err, arg) => {
                console.log("status:", result)
                return ["order"]
            }
        }),

        deleteOrder: builer.mutation({
            query: (id) => ({
                url: `order/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: (result, err, arg) => {
                console.log("deleteOrder:", result)
                return [{ type: 'order', id: 'LIST' }]
            }
        }),

        // Team
        createTeam: builer.mutation({
            query: (body) => ({
                url: 'team/create',
                method: 'post',
                body: body
            }),
            invalidatesTags: [{ type: 'team', id: 'LIST' }]
        }),

        getAllTeam: builer.query({
            query: () => ({
                url: 'team/getAllTeam',
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                const allTags = result ? [...result.result.map((ele) => ({ type: 'team', id: ele.id })), { type: 'team', id: 'LIST' }] : [{ type: 'team', id: 'LIST' }]
                console.log('All data provide tag: ', allTags)
                return allTags
            },
        }),

        getTeam: builer.query({
            query: (id) => ({
                url: `team/getTeam/${id}`,
                method: 'get'
            }),
            providesTags: (result, err, arg) => {
                console.log("Data: ", result, arg)
                return ["team"]
            }
        }),

        updateTeam: builer.mutation({
            query: (data) => ({
                url: `team/updateTeam/${data.id}`,
                method: 'put',
                body: data.body
            }),
            invalidatesTags: [{ type: 'team', id: 'LIST' }]
        }),

        deleteTeam: builer.mutation({
            query: (id) => ({
                url: `team/delete/${id}`,
                method: 'delete'
            }),
            invalidatesTags: [{ type: 'team', id: 'LIST' }]
        })
    })
})

export const {
    useGetAllCustomersQuery,
    useCountProductsQuery,
    useCountCustomersQuery,
    useCountOrdersQuery,
    useTotalIncomeQuery,
    useGetAllOrdersQuery,
    useCreateTeamMutation,
    useGetTeamQuery,
    useGetAllTeamQuery,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
    useGetCustomerQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useCreateCustomerMutation,
    useGetOrderQuery,
    useChnageOrderStatusMutation,
    useDeleteOrderMutation,
    useGetAllProductsQuery,
    useCreateProductMutation,
    useCreateUserMutation,
    useUserLoginMutation,
    useLoginStatusQuery,
    useLoginOutMutation
} = dataAPI
export default dataAPI
