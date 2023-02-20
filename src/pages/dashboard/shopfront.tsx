import { useState } from "react";
import { Layout } from "../../components/common/Layout";
import { observer } from "mobx-react-lite";
import { RiEdit2Line, RiEditLine, RiUpload2Line } from "react-icons/ri";
import Image from "next/image";
import { Button } from "../../components/common/Button";
import { useStore } from "../../store";

const Shopfront = observer(() => {
  const [coverPhotoHover, setCoverPhotoHover] = useState(false);
  const [profilePhotoHover, setProfilePhotoHover] = useState(false);

  const { shopfrontView } = useStore();

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-col mt-10 w-[800px]">
          <label className="h-[200px]">
            <div
              onMouseEnter={() => setCoverPhotoHover(true)}
              onMouseLeave={() => setCoverPhotoHover(false)}
              className="bg-[yellow] h-[200px] w-[800px] rounded flex items-center justify-center cursor-pointer"
              aria-hidden="true"
            >
              {shopfrontView.coverPhoto && (
                <Image
                  alt="Cover Photo"
                  width={800}
                  height={200}
                  className="h-[200px] w-[800px]"
                  src={URL.createObjectURL(shopfrontView.coverPhoto)}
                />
              )}
              {coverPhotoHover && <RiUpload2Line size={80} />}
            </div>
            <input
              type="file"
              id="upload"
              onChange={(event: any) => {
                shopfrontView.setCoverPhoto(event.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </label>
          <label className="-mt-20 ml-8 left-8 w-[180px] h-[180px]">
            <div
              onMouseEnter={() => setProfilePhotoHover(true)}
              onMouseLeave={() => setProfilePhotoHover(false)}
              className="bg-[red] h-[180px] w-[180px] rounded flex items-center justify-center cursor-pointer"
              aria-hidden="true"
            >
              {shopfrontView.profilePhoto && (
                <Image
                  alt="Profile Photo"
                  width={180}
                  height={180}
                  className="h-[180px] w-[180px] rounded"
                  src={URL.createObjectURL(shopfrontView.profilePhoto)}
                />
              )}
              {profilePhotoHover && <RiUpload2Line size={80} />}
            </div>
            <input
              type="file"
              id="upload"
              onChange={(event: any) => {
                shopfrontView.setProfilePhoto(event.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </label>
          <div className="mt-8">
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2 mb-2">
                Groomer Plase
              </span>
              <button>
                <RiEdit2Line size={20} />
              </button>
            </div>
            <div>
              <span className="mr-2">This is a bio about this plase</span>
              <button>
                <RiEdit2Line />
              </button>
            </div>
          </div>
        </div>
        <div>
          {shopfrontView.coverPhoto ||
            (shopfrontView.profilePhoto && (
              <Button onClick={shopfrontView.handleSave}>Save</Button>
            ))}
        </div>
      </div>
    </Layout>
  );
});

export default Shopfront;
