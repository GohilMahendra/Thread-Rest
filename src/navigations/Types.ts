import { CompositeNavigationProp, NavigationProp } from "@react-navigation/native";
import { AuthStackType } from "./AuthStack";
import { RootStackType } from "./RootStack";
import { UserTabType } from "./UserTab";
import { HomeStackParams } from "./FeedStack";
import { ProfileStacktype } from "./ProfileStack";
import { FavoriteStackType } from "./FavoriteStack";
import { SearchStackParams } from "./SearchStack";


// composite navigation types for navigate into nested navigation
export type composeteAuthRootStack = CompositeNavigationProp<NavigationProp<AuthStackType>,NavigationProp<RootStackType>>
export type compositeRootUserTab = CompositeNavigationProp<NavigationProp<RootStackType>,NavigationProp<UserTabType>>
export type compositeRootHomeStack = CompositeNavigationProp<NavigationProp<RootStackType,"CreatePost">,NavigationProp<HomeStackParams>>
export type ProfileRootComposite = CompositeNavigationProp<NavigationProp<ProfileStacktype>,NavigationProp<RootStackType>>
export type FavoriteRootComposite = CompositeNavigationProp<NavigationProp<FavoriteStackType,"Favorite">,NavigationProp<RootStackType>>
export type compositeUserProfileRootNavigation = CompositeNavigationProp<NavigationProp<HomeStackParams, "Home">, NavigationProp<RootStackType>>
export type compositePostSearchRootNavigation = CompositeNavigationProp<NavigationProp<SearchStackParams, "PostSearch">, NavigationProp<RootStackType>>