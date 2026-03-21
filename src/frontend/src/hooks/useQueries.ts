import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InquiryDTO } from "../backend";
import { useActor } from "./useActor";

export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  buyLink: string;
  previewAudioUrl: string;
}

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      // getProducts not in backend interface, use placeholder
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (inquiry: InquiryDTO) => {
      if (!actor) throw new Error("No actor available");
      await actor.submitInquiry(inquiry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
