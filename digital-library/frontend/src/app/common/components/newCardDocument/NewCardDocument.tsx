import Image from "next/image";
import cover from "../../../../../public/images/overview.svg";
import startGrey from "../../../../../public/images/Shape.svg";
import start from "../../../../../public/images/star (1).svg";
import saveGrey from "../../../../../public/images/Save to library.svg";
import save from "../../../../../public/images/Save to library (1).svg";
import { useRouter } from "next/navigation";
import { useAddDocument } from "@/app/hooks/useAddDocument";
import { idHandler } from "@/redux/features/addDocument-slice";

const arrayTest = [1, 2, 3, 4, 5];
const NewCardDocument: React.FC<{
  number?: number;
  saveDoc?: boolean;
  imgCover?: any;
  categorie?: string;
  title?: string;
  description?: string;
  id?: string;
}> = (props) => {
  const { push } = useRouter();
  const { dispatch, idDoc } = useAddDocument();
  console.log(props.id);
  
  return (
    <div
      className="w-full hover:border"
      onClick={() => {
        props.id && dispatch(idHandler(props.id));
        push("/view-document");
      }}
    >
      <div className="h-[200px]">
        <div className="h-[56px]"></div>
        <div className="flex gap-5 justify-between items-start relative h-36 bg-white border-t border-l border-r border-white rounded-tr-3xl">
          <Image
            src={props.imgCover ? props.imgCover : cover}
            alt=""
            width={192}
            height={192}
            className="w-48 h-48 -mt-12 object-contain"
          />

          <p className="lg:text-base sm:text-sm text-xs px-3 py-2 bg-[#47586E] font-semibold text-white rounded-tl-full rounded-bl-full rounded-tr-full">
            {props.categorie ? props.categorie : " Thesisjjjjj"}
          </p>
        </div>
      </div>
      <div className="p-2 bg-white relative pt-5  overflow-hidden ">
        <h1 className="w-48 h-14 text-lg truncate">
          {props.title
            ? props.title
            : " The Contant Evolution of Quantum Physics"}
        </h1>
        <div className="my-4 text-sm w-[260px]  h-12 overflow-hidden  text-clip	">
          <p className="truncate">
            {" "}
            {props.description
              ? props.description
              : "  Lorem ipsum dolor sit amet consectetur. Ac sed turpis tellus scelerisque neque cursus urna. Tristique nunc mi adipiscing vitae fames odio varius..."}
          </p>
        </div>
        <p className="my-2 text-[#909DAD] text-sm font-semibold">By IFYAR</p>
        <p className="flex justify-between text-[#47586E] font-bold">
          <span>feb 2004</span>
          <span>20.000fcfa</span>
        </p>

        <div className="flex justify-between items-center my-4">
          <div className="flex justify-start sm:gap-2  items-center">
            {arrayTest.map((item) => {
              if (props.number && props.number > 0 && item <= props.number) {
                return <Image src={start} alt="" />;
              } else {
                return <Image src={startGrey} alt="" />;
              }
            })}
          </div>
          <Image src={props.saveDoc ? save : saveGrey} alt="" />
        </div>

        <div className="flex justify-between items-center my-2">
          <span></span>
          <button className="px-4 py-2 text-white font-semibold rounded-full bg-mainColor text-sm">
            suscribe
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewCardDocument;
