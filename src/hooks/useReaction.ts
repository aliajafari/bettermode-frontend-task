import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../queries/queries";

export default function useAddReaction() {
  const [addReactionMutation, { data, loading, error }] =
    useMutation(ADD_REACTION);

  const addReaction = async ({
    postId,
    reaction,
    overrideSingleChoiceReactions,
  }: {
    postId: string;
    reaction: string;
    overrideSingleChoiceReactions: boolean;
  }) => {
    try {
      const response = await addReactionMutation({
        variables: {
          postId,
          input: {
            reaction,
            overrideSingleChoiceReactions,
          },
        },
      });

      return response.data?.addReaction;
    } catch (err) {
      console.error("Error adding reaction:", err);
      throw err;
    }
  };

  return {
    addReaction,
    data,
    loading,
    error,
  };
}
