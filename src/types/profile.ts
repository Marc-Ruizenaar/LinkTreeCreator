export interface UserProfile {
  user_id?: string;
  displayname: string;
  bio?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  youtube?: string;
  website?: string;
  pinterest?: string;
  linkedin?: string;
  x?: string;
  spotify?: string;
  applePodcast?: string;
  etsy?: string;
  discord?: string;
  snapchat?: string;
  twitch?: string;
  vimeo?: string;
}

export interface SocialMediaLinks {
  email: string;
  facebook: string;
  youtube: string;
  website: string;
  pinterest: string;
  linkedin: string;
  x: string;
  spotify: string;
  applePodcast: string;
  etsy: string;
  discord: string;
  snapchat: string;
  twitch: string;
  vimeo: string;
}

export interface SocialMediaProps {
  instagram: string;
  tiktok: string;
  socialLinks: SocialMediaLinks;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
