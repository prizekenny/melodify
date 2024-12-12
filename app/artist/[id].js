import { useLocalSearchParams } from "expo-router";
import ArtistScreen from "../../screens/ArtistScreen";

export default function Artist() {
  const { id } = useLocalSearchParams();

  return <ArtistScreen artistId={id} />;
}
