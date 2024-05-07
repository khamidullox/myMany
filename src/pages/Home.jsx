import React, { useContext, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import InputForm from "../components/InputForm";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { GlobalContext } from "../hooks/useGlobal";
import { db } from "../firebase/firebase";
export let actionhome = async ({ request }) => {
  let formData = await request.formData();
  let price = formData.get("price");
  let title = formData.get("title");
  let url = formData.get("url");
  return { url, title, price };
};

function Home() {
  let action = useActionData();

  let handleSubmitHome = async () => {
    console.log(action)
    const docRef = await addDoc(collection(db, "money"), action);
  };
  useEffect(()=>{
    handleSubmitHome()
  },[action])
  let { data } = useContext(GlobalContext);
  return (
    <section className="h-full flex justify-around  py-5 md:flex-row flex-col">
      <Form
        method="post"
        className=" p-5 bg-white rounded-lg flex flex-col gap-4 w-80"
      >
        <InputForm label="Price" type="number" placeholder="$" name="price" />
        <InputForm label="Title" type="text" name="title" />
        <InputForm label="PhoroUrl" type="url" name="url" />
        <button onClick={handleSubmitHome} className="btn btn-info  ">
          Submit
        </button>
      </Form>
      <ul className="flex flex-col scroll-smooth gap-5 mt-8  ">
        {!data && (
          <h3 className="text-center mb-5 mt-5 font-bold">Loading ...</h3>
        )}
        {data &&
          data.map((item) => {
            return (
              <li
                key={item.idF}
                className="flex justify-between w-96 border rounded-3xl p-5 "
              >
                <img className=" w-16 h-16" src={item.url} alt="" />
                <div>
                  <h2 className=" font-bold text-2xl mb-2">{item.title}</h2>
                  <h3>Price:{item.price}$</h3>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default Home;
