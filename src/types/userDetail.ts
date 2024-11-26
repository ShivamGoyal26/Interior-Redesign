// Define the UserDetailContextType if it doesn't exist
export type UserDetailContextType = {
  userDetail: {
    credits: string;
    id: string;
    name: string;
    email: string;
    image_url: string;
  };
  setUserDetail: (props: UserDetailContextType["userDetail"]) => void;
};
