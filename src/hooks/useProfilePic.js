import axios from "axios";
import { useEffect, useState } from "react";
import { PREDIKETE_API } from "../constants";

const DEFAULT_IMG =
  "https://th.bing.com/th/id/R.bc02443cfdbb46bad773c1fd5a0bae92?rik=WOj%2bAJL3d3pZvQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_181369.png&ehk=f%2f4GPvSh%2bAbwz1aWNGbWCl6en5XJp2ubj0Zn1ljTwe0%3d&risl=&pid=ImgRaw&r=0https://www.bing.com/images/search?view=detailV2&ccid=93sdbql1&id=3B7029DC5641583B52A62922DF716ADF484D69BA&thid=OIP.93sdbql1H_wxikekhCaK8AHaHa&mediaurl=https%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_162386.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.f77b1d6ea9751ffc318a47a484268af0%3frik%3dumlNSN9qcd8iKQ%26pid%3dImgRaw%26r%3d0&exph=980&expw=980&q=Default+Avatar&simid=607991924322210204&FORM=IRPRST&ck=FB56E0B0BE0F0601CDF04FDF678D6FC9&selectedIndex=2";

export const useProfilePic = (user) => {
  const [profilePic, setProfilePic] = useState(DEFAULT_IMG);

  useEffect(() => {
    if (user?.profile.picture) {
      axios
        .get(`${PREDIKETE_API}/users/profile-image/${user.profile.picture}`, {
          responseType: "blob",
        })
        .then((res) => {
          setProfilePic(URL.createObjectURL(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const deleteProfilePic = () => {
    setProfilePic(DEFAULT_IMG);
  };

  return { profilePic, deleteProfilePic };
};
