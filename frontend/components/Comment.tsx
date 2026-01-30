import { View, Text, Image } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { COLORS } from "@/constants/theme";

interface CommentProps {
  content: string;
  _creationTime: number;
  user: {
    fullname: string;
    image: string;
  };
}

export default function Comment({ comment }: { comment: CommentProps }) {
  return (
    <View style={{
      borderBottomWidth: 0.5,
      borderBottomColor: COLORS.surface,
    }}
      className="flex-row py-2 px-4"
    >
      <Image source={{ uri: comment.user.image }} style={{
        width: 32,
        height: 32,
      }}
        className="rounded-full mr-3"
      />
      <View style={{}}
        className="flex-1"
      >
        <Text style={{}}
          className="text-gray-100 font-semibold mb-2"
        >
          {comment.user.fullname}
        </Text>
        <Text style={{
          lineHeight: 20,
          fontSize: 14,
        }}
          className="text-gray-100"
        >
          {comment.content}
        </Text>
        <Text style={{}}
          className="text-gray-500 text-sm mt-1"
        >
          {formatDistanceToNow(comment._creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View>
  );
}