import { Resend } from "resend";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
   const body = await request.json();
const logoPath = path.join(
  process.cwd(),
  "public",
  "cardinal-pole-logo.png"
);

const logo = fs.readFileSync(logoPath).toString("base64");
const subjectStripUrl =
  body.subject === "History"
    ? "https://praisepost.vercel.app/history-strip.png"
    : "https://praisepost.vercel.app/mathematics-strip.png";


    const { data, error } = await resend.emails.send({
      from: "PraisePost <onboarding@resend.dev>",
      to: ["alex@amplifiedschools.co.uk"],
subject: `${body.firstName} has received a PraisePost! ⭐`,
attachments: [
  {
    filename: "cardinal-pole-logo.png",
    content: logo,
    contentId: "cardinal-pole-logo",
  },

  
],
html: `
<style>
  @media only screen and (max-width: 600px) {
    .email-outer {
      padding: 12px 8px !important;
    }

    .praise-content {
      padding: 28px 24px !important;
    }

    .praise-title {
      font-size: 26px !important;
    }
  }
</style>
<div class="email-outer" style="margin:0; padding:40px 20px; background:#f3f4f6; font-family:Arial, Helvetica, sans-serif; color:#111111;">
    
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden;">
<div style="background:#ffffff; text-align:center; padding:28px 30px 20px 30px;">
  <img
src="cid:cardinal-pole-logo"
    alt="Cardinal Pole Catholic School"
    width="100"
    style="display:block; width:100px; height:auto; margin:0 auto;"
  />
</div>
      <div style="background:#b5424a; color:#ffffff; text-align:center; padding:36px 30px;">
        <div style="font-size:13px; letter-spacing:2px; text-transform:uppercase; margin-bottom:20px;">
          Cardinal Pole Catholic School
        </div>
<h1 class="praise-title" style="font-size:32px; line-height:1.2; margin:0 0 16px 0;">
  ${body.firstName} has received a PraisePost!
</h1>

<div style="font-size:52px; line-height:1;">
  ⭐
</div>
</div>
<div class="praise-content" style="padding:36px 40px; background-color:#ffffff;">
  <div style="font-size:13px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; color:#666666; margin-bottom:18px;">
    ${body.subject}
  </div>

<p style="font-size:20px; line-height:1.6; margin:0 0 30px 0;">
  ${body.praiseSentence}
</p>
</div>

<div style="background:#b5424a; padding:6px 0; margin:0;">
  <img
    src="${subjectStripUrl}"
    alt=""
    width="520"
    style="display:block; width:100%; max-width:520px; height:auto; margin:0 auto;"
  />
</div>

<div class="praise-content" style="padding:30px 40px 36px 40px; background-color:#ffffff;">
  <div style="background:#f5f5f5; border-radius:12px; padding:22px; margin:0 0 30px 0;">
    <p style="font-size:16px; line-height:1.6; margin:0 0 14px 0;">
      Please take a moment to congratulate ${body.firstName} on this achievement, and ask what earned this recognition.
    </p>

    <p style="font-size:16px; line-height:1.6; margin:0;">
      Talking together about ${body.firstName}'s successes and the reasons behind them helps to reinforce positive behaviour and encourage continued effort.
    </p>
  </div>
        <div style="border-top:1px solid #dddddd; padding-top:22px;">
          <p style="font-size:16px; margin:0;">
            Awarded by <strong>Mr Parker</strong>
          </p>
        </div>

      </div>

    </div>

  </div>
`,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("PraisePost send error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}