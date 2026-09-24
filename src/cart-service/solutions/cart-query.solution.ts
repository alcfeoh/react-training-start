import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addToCart, getCartContents, removeFromCart} from "../cart-service.ts";
import {LicensePlateData} from "../../license-plate-data.type.ts";

/**
 * Also needed in App.tsx:
 *
 * import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
 * import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
 *
 * const queryClient = new QueryClient(); // outside the component
 *
 * // in App's return:
 * <QueryClientProvider client={queryClient}>
 *   <BrowserRouter>
 *     ...
 *   </BrowserRouter>
 *   <ReactQueryDevtools />
 *   <ReactQueryDevtools initialIsOpen={false} />
 * </QueryClientProvider>
 */


const CART_KEY = 'cartContents';

export function useCartQuery() {

    const queryClient = useQueryClient();

     const cartQuery = useQuery({
        queryKey: [CART_KEY],
        queryFn: () => getCartContents(),
        staleTime: 30000
    });

     const addPlateToCart = useMutation({
        mutationFn: (plate: LicensePlateData) => addToCart(plate),
        onSuccess: data => queryClient.invalidateQueries({queryKey: [CART_KEY]})
    });

     const removePlateFromCart = useMutation({
        mutationFn: (plate: LicensePlateData) => removeFromCart(plate),
         onSuccess: data => queryClient.invalidateQueries({queryKey: [CART_KEY]})
    })

    return {cartQuery, addPlateToCart , removePlateFromCart};
}
