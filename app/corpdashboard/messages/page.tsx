import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import CorpMessageCard from "@/components/Messages/message-card";
import CorpMessagesPagination from "@/components/Messages/message-pagination";
import Head from "next/head";
import React from "react";

export default function page() {
	const from = { firstName: "تینا", lastName: "محمدپور" };
	const topic = "این یک پیام خیلی خیلی مهم است";
	const body =
		".ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آیندلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،";
	const date = "1404/2/12";

	return (
		<>
			{/* <CorpMessageCard from={from} date={date} topic={topic} body={body}></CorpMessageCard> */}
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<PageContainer>
				{/* <div className="flex flex-wrap w-full rtl mt-20 "> */}
					<Header header="پیام‌های من" />
					{/* <h1 className="font-bold text-xl mb-4  md:mr-14 mr-4">
					پیام های من
          </h1> */}
					<CorpMessagesPagination />
				{/* </div> */}
			</PageContainer>
		</>
	);
}
