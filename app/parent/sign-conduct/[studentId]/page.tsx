'use client';
import StudentRecord from "@/components/parents/student.modal";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

import Spinner from "@/components/spinner";
import { setStudentsList } from "@/store/slices/parent/studentsSlick";
import useGeneratePDF from "@/services/parent/useGeneratePDF";

export default function Page(props: any) {

  const studentId = props.params.studentId;
  const students = useAppSelector((state) => state.student.student);
  console.log(students);
  const selectedStudent = students?.find((student) => student.StudentNumber == studentId)
  const [studentInfo, setStudentInfo] = useState<StudentRecord>(selectedStudent ?? {} as StudentRecord);
  const [confirm, setConfirm] = useState<boolean>(false);
  const confirmInputRef = useRef<HTMLInputElement>(null); // Create a ref for the confirm checkbox
  const [highlightConfirm, setHighlightConfirm] = useState(false); // State to toggle highlight
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  const handleSign = () => {
    if (!confirm) {
      // Scroll to the confirm checkbox and highlight it
      if (confirmInputRef.current) {
        confirmInputRef.current.scrollIntoView({ behavior: 'smooth' });
        setHighlightConfirm(true);
      }
    } else {
      // Proceed with signing logic
      console.log("Form is confirmed and signed.");

      useGeneratePDF(selectedStudent, '/Methaq.pdf', '/Alexandria-font.ttf');

      let updatedStudent = { ...selectedStudent, isSigned: "Yes" }
      let updatedStudents: any = students?.map((student) =>
        student.StudentNumber == studentId ? updatedStudent : student
      );
      dispatch(setStudentsList(updatedStudents))


    }


  }


  return (
    <>
      {loading && <Spinner />}

      <div className="container   p-8 bg-white  ">

        <div className=" mb-8">
          <h1 className="text-3xl font-bold mb-2">ميثاق الشراكة بين المدرسة وولي الأمر</h1>
        </div>


        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">مقدمة</h2>
          <p className="mb-4">
            يلعب أولياء الأمور دوراً أساسياً في نجاح تعلم أبنائهم وتطورهم، ويعتبر التواصل الدائم والمستمر بين المدرسة وولي الأمر شرطاً أساسياً لتحقيق أقصى استفادة للطلبة في تجربتهم التعليمية. كما يحقق التفاهم المتبادل والتعاون بين الطرفين بيئة تعليمية صالحة ومحفزة لتطوير قدرات الطلبة ونموهم الشخصي والأكاديمي.

          </p>
          <p className="mb-4">يهدف هذا الميثاق إلى بناء جسور قوية من التفاهم والثقة والشراكة بين المدرسة وولي الأمر، مما يعزز الدعم المتبادل ويسهم في تطوير بيئة تعليمية إيجابية تحفز النمو الشامل للطلبة في مسيرتهم الأكاديمية وترسيخ القيم وتعلم السلوكيات السليمة. كما يحدد الأدوار والمسؤوليات لكل من المدرسة وولي الأمر، ويشجع على التواصل المستمر والمشاركة الفعالة من جانب أولياء الأمور في حياة أبنائهم الدراسية لدعم الجهود التعليمية في المنزل.

          </p>
          <p className="mb-4">الغرض الرئيسي والأساسي من هذا الميثاق هو الاستراتيجية الشاملة والمتكاملة لتعزيز اتجاهات إيجابية نحو تطوير التعليم في دولة الإمارات العربية المتحدة، تأسساً على السياسات واللوائح والقوانين والإرشادات الصادرة عن مؤسسة الإمارات للتعليم المدرسي وكل من أجل تحقيق رؤية دولة الإمارات في المستقبل.

          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded border-gray-300 p-6 mb-5" >

          <div>
            <div className="mb-4 md:flex md:items-baseline">
              <label htmlFor="school-representative" className="block mb-2">الطرف الأول: مؤسسة الإمارات للتعليم المدرسي ويمثلها مدرسة</label>
              <input type="text" id="school-representative" value={studentInfo.SchoolName} name="school-representative" className="w-full p-2 border border-gray-300 rounded" placeholder="..........................................................." />
            </div>
            <div className="mb-4 md:flex md:items-baseline">
              <label htmlFor="school-address" className="block mb-2">عنوانها:</label>
              <input value={studentInfo.SchoolAddress} type="text" id="school-address" name="school-address" className="w-full p-2 border border-gray-300 rounded" placeholder="..........................................................." />
            </div>
            <div className="mb-4 md:flex md:items-baseline">
              <label htmlFor="school-contact" className="block mb-2">رقم التواصل:</label>
              <input disabled value={studentInfo.SchoolPhone} type="text" id="school-contact" name="school-contact" className="w-full p-2 bg-gray-500 border border-gray-300 rounded" placeholder="..........................................................." />
            </div>
          </div>

          <div>
            <p>الطرف الثاني: ولي الأمر/ الوصي</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4 md:flex md:items-baseline">
                <label htmlFor="guardian-name" className="block mb-2">اسم ولي الأمر/ الوصي:</label>
                <input
                  type="text"
                  id="guardian-name"
                  value={studentInfo.ParentName}
                  name="guardian-name"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="..........................................................."
                />
              </div>

              <div className="mb-4 md:flex md:items-baseline">
                <label htmlFor="emirates-id-1" className="block mb-2">رقم الهوية الإماراتية:  </label>
                <input
                  type="text"
                  value={studentInfo.ParentEmiratesID}
                  id="emirates-id-1"
                  name="emirates-id-1"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="..........................................................."
                />
              </div>
              <div className="mb-4 md:flex md:items-baseline" >
                <label htmlFor="student-name" className="block mb-2">اسم الطالب/الطالبة:</label>
                <input
                  type="text"
                  id="student-name"
                  value={studentInfo.Name}
                  name="student-name"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="..........................................................."
                />
              </div>

              <div className="mb-4 md:flex md:items-baseline">
                <label htmlFor="emirates-id-2" className="block mb-2">رقم الهوية الإماراتية:</label>
                <input
                  type="text"
                  id="emirates-id-2"
                  value={studentInfo.StudentEmiratesID}
                  name="emirates-id-2"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="..........................................................."
                />
              </div>
              <div className="mb-4 md:flex md:items-baseline">
                <label htmlFor="address" className="block mb-2">العنوان:</label>
                <input
                  type="text"
                  id="address"
                  value={studentInfo.Address}
                  name="address"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="..........................................................."
                />
              </div>
              <div className="mb-4 md:flex md:items-baseline">
                <label htmlFor="guardian-contact" className="block mb-2">رقم الهاتف:</label>
                <input
                  type="text"
                  id="guardian-contact"
                  value={studentInfo.Phone}
                  name="guardian-contact"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="..........................................................."
                />
              </div>
            </div>
          </div>

        </div>

        <h3 className="text-2xl my-10">بنود ومحتويات الميثاق </h3>
        <div className="border rounded border-gray-300 p-6 mb-5  h-[400px] overflow-x-hidden overflow-y-scroll">
          <div className="parents p-6">
            <div className="school ">
              <h2 className="text-xl font-bold mb-4">التزامات المدرسة:</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>الالتزام بتوفير خدمات تعليمية وخدمات رعاية وفق أفضل المعايير.</li>
                <li>الالتزام والحرص على المساواة بين الطلبة وعدم التمييز والتفريق بينهم.</li>
                <li>
                  التزام الكادر الإداري والتعليمي في المدرسة بميثاق الأخلاق والذي ينص على القيم المعتمدة في دولة الإمارات العربية المتحدة للعاملين في القطاع التعليمي.
                </li>
                <li>
                  توفير كوادر ذات كفاءة لقيادة التعليم والتعلم، تقوم بدعم الطلبة لتحقيق إنجازات تعليمية متماشية مع المعايير الدولية والوطنية، ودعم التطور الشخصي والاجتماعي لجميع الطلبة المسجلين في المدرسة بما في ذلك الطلبة ذوي الاحتياجات التعليمية الخاصة، وتطوير أداء هذه الكوادر من خلال التدريب المستمر.
                </li>
                <li>
                  تصميم برنامج تعليمي يركز على الجوانب الأكاديمية والاجتماعية والنفسية للطلبة بالإضافة إلى ترسيخ القيم والعادات وتعزيز الانتماء لثقافة وتراث دولة الإمارات المتحدة، يتم تنفيذهم من خلال سياسة تدريس وتقييم مبنية على أفضل الممارسات أو من خلال الأنشطة وبرامج الإرشاد.
                </li>
                <li>
                  توفير مواد وبرامج مصممة ومعدة خصيصاً لتلبية احتياجاتهم الفردية وتقوية مهاراتهم وتوفير أنشطة متميزة تطور مهارات الطلبة الفائقين والموهوبين.
                </li>
                <li>
                  إبلاغ أولياء الأمور بصفة مستمرة عن نتائج التقييمات والإجراءات المعتمدة لرفع مستوى أداء أبنائهم.
                </li>
                <li>
                  إبلاغ أولياء الأمور بصفة مستمرة عن السلوكيات الإيجابية أو المخالفات والسلوكيات الصادرة من أبنائهم.
                </li>
                <li>
                  الالتزام بتعريف ولي الأمر بالمناهج والبرامج التعليمية التي سيخضع لها الطالب خلال العام الدراسي.
                </li>
                <li>
                  الالتزام بتوفير تفاصيل سياسة التقييم والامتحانات المتبعة في المدارس وسياسة النجاح وإعادة السنة.
                </li>
                <li>
                  الالتزام بتعريف أولياء الأمور بجميع اللوائح والتشريعات الصادرة من المؤسسة (مثل سياسة حماية الطفل، لائحة إدارة السلوك...الخ).
                </li>
                <li>
                  توفير بيئة تعليمية غنية وداعمة ومرافق مجهزة ومعدلة لاحتياجات الطلبة أصحاب الهمم.
                </li>
                <li>
                  وضع الإجراءات الخاصة بسلامة وأمن الطلبة داخل المدرسة وفي الحافلات وخلال الأنشطة والرحلات المدرسية ومشاركتها مع أولياء الأمور والطلبة.
                </li>
                <li>
                  المسؤولية الكاملة عن سلامة الطلبة أثناء وجودهم داخل الصفوف أو أثناء استخدامهم مرافق المدرسة أو الحافلات المدرسية، سواء كانت تديرها المدرسة أو مقدم خدمة خارجي.
                </li>
                <li>
                  الالتزام بالتنفيذ الكامل للإجراءات والقوانين المتعلقة بالنقل المدرسي للفئة العمرية والتي حددتها الجهات المختصة.
                </li>
                <li>
                  وضع الإرشادات المتعلقة بصحة الطلبة وتوعيتهم بالعادات وأنماط الحياة الصحية، بما في ذلك اختيار الطعام الصحي وممارسة الرياضة. بالإضافة إلى توفير الرعاية الطبية المناسبة للطلبة الذين يعانون من حالات طبية وتقديم الرعاية التي يحتاجونها مع الحفاظ على سرية المعلومات الطبية.
                </li>
                <li>
                  بناء قنوات تواصل فعالة مع أولياء الأمور وإبلاغهم بجميع السياسات وأي تغييرات قد تطرأ على الإجراءات والتعليمات ومشاركتهم بالمعلومات المهمة بالإضافة إلى أخبار المدرسة.
                </li>
                <li>
                  الشفافية والعدالة في تنفيذ الإجراءات والسياسات والحفاظ على سرية المعلومات وبيانات الطلبة.
                </li>
              </ul>
            </div>
            <div className="parent mt-5">
              <h2 className="text-xl font-bold mb-4">التزامات ولي الأمر:</h2>
              <h3 className="text-lg font-semibold mt-4 mb-2">السلوك:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>المساهمة في تشجيع أبنائهم على القيم المشتركة وتحفيزهم على التعلم والالتزام بالقوانين واحترام المعلمين وجميع العاملين في المدرسة.</li>
                <li>الالتزام باطلاع الأبناء على لائحة إدارة سلوك الطلبة في مؤسسات التعليم الحكومية الاتحادية المعتمدة، وإرشادهم إلى الالتزام بها في جميع الأوقات؛ لتعزيز السلوك السوي، والإيجابي وتشجيعهم على الالتزام باستخدام اللغة الإيجابية المهذبة تجاه المعلمين، وجميع العاملين من الكادر المدرسي وزملائهم الطلبة والابتعاد عن جميع أساليب التنمر بأشكاله المتنوعة.</li>
                <li>الابتعاد عن التشهير بأي عضو من أعضاء المجتمع المدرسي أو تهديده أو تكرار الادعاءات الكاذبة ضده داخل الحرم المدرسي أو خارجه أو على أي وسيلة من وسائل التواصل الاجتماعي أو غيرها.</li>
                <li>الالتزام بفهم العواقب المحتملة على أبنائهم، وإدراكها، والتي قد تنشأ عن مخالفة أي من قواعد السلوك المطبقة.</li>
                <li>الالتزام بالحضور المبكر للمدرسة وفي المواعيد المحددة والإلمام بعواقب الغياب دون عذر مقبول.</li>
                <li>الالتزام بتسديد تكاليف قيمة الأضرار التي قد يحدثها الطالب في المدرسة أو وسائل النقل.</li>
                <li>الالتزام بتعليمات المدرسة لتسوية أية نزاعات محتملة.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">جودة حياة الطلبة/ الصحة والسلامة:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>الالتزام بتوفير بيئة صحية مناسبة تشمل الغذاء الصحي وتوفير بيئة عائلية مستقرة.</li>
                <li>الالتزام بتوفير الوقت الكافي للنوم والاسترخاء والراحة النفسية لأبنائهم.</li>
                <li>الالتزام بمعايير الغذاء الصحية وأصناف الطعام والشراب المسموح بها في المدرسة ومتابعة النظام الغذائي المناسب.</li>
                <li>الالتزام والتوعية حول النظافة الشخصية للأبناء.</li>
                <li>الالتزام بتوفير النشاط البدني والتحفيز على ممارسته من خلال التحرك واللعب.</li>
                <li>الالتزام بتقديم المساعدة والدعم للأبناء في حل المشاكل الشخصية والعاطفية والدراسية.</li>
                <li>الالتزام بتحفيز الأبناء على المشاركة في الأنشطة الثقافية والفنية والاجتماعية التي تحسن جودة حياتهم.</li>
                <li>الالتزام بالمشاركة في الأنشطة المدرسية والتعاون مع المدرسة في تحقيق الأهداف المرجوة للحفاظ على جودة حياة الأبناء.</li>
                <li>الالتزام بالتصريح عن جميع المعلومات المتعلقة بالظروف الصحية لأبنائهم وسيرتهم المرضية من خلال تزويد المدرسة بالتقارير الطبية عند التسجيل ومتابعة تحديثها.</li>
                <li>الالتزام بالإجابة على الاستبانات المرسلة من قبل المؤسسة أو المدرسة.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">المواطنة الإيجابية والهوية الوطنية:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>الالتزام بتعزيز المواطنة الصالحة والمسؤولية الاجتماعية عند الأبناء وتحفيزهم على القيام بالواجبات والمسؤوليات الوطنية، وتشجيعهم على المشاركة الفعالة في الحياة الاجتماعية والأعمال الخيرية والتطوعية.</li>
                <li>الالتزام بتحفيز الأبناء وتعزيز الهوية الوطنية والتحلي بالأخلاق والقيم الإنسانية الأساسية والاحترام والتسامح والتعايش المشترك بين المواطنين والمقيمين.</li>
                <li>الالتزام بالتعاون والتنسيق مع المدرسة لتحقيق أهداف التربية الوطنية لدى الأبناء، وتعزيز الوحدة الوطنية والترابط والتلاحم بين أفراد المجتمع.</li>
                <li>الالتزام بتحفيز الأبناء على احترام التنوع الثقافي والعرقي للمجتمع المدرسي وعدم الإساءة إلى العرقية المجتمعية والتحريض عليها وكذلك عدم الإساءة إلى الديانات السماوية، أو إثارة كل ما يسبب الفتنة الطائفية والمذهبية بالمدرسة.</li>
                <li>الالتزام بتنمية الوعي الوطني لدى الأبناء وتعريفهم بتاريخ الدولة وثقافتها وتراثها الغني، وتعزيز المشاركة الفعالة في المجتمع الإماراتي.</li>
                <li>الالتزام بالحفاظ على سمعة وصورة دولة الإمارات العربية المتحدة لدى الأبناء وتمثيلهم لدولة الإمارات العربية المتحدة خير تمثيل.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">التحصيل الدراسي والمناهج والبرامج التعليمية:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>الالتزام بتحديث بيانات الأبناء حسب الإجراءات والشروط والأحكام المعتمدة في المؤسسة.</li>
                <li>الالتزام بتوفير جهاز الحاسب المحمول للطالب من قبل الشركات المعتمدة والمعلن عنها لدى المؤسسة، وفي حال الرغبة باستخدام الجهاز الخاص بالطالب يلتزم ولي الأمر بتوفير جهاز يطابق المواصفات المعتمدة مع الالتزام بالمعايير والشروط الخاصة بسياسة استخدام الحاسوب.</li>
                <li>الالتزام بتوفير المكان المناسب، وإتاحة جميع المواد اللازمة بغية تمكين الأبناء من تأدية واجباتهم المدرسية.</li>
                <li>الالتزام بالتواصل مع المدرسة والمعلمين والمرشدين لمتابعة أداء الأبناء في الدراسة، وتقديم الدعم الإضافي لهم عند الحاجة.</li>
                <li>الالتزام بتحفيز الأبناء على الدراسة، وتحديد الأهداف الواضحة لهم، وإرشادهم، وإظهار أهمية التعليم في حياتهم المستقبلية.</li>
                <li>الالتزام بتشجيع الأبناء على تطوير المهارات الإبداعية والاهتمام بالمواضيع الدراسية.</li>
                <li>الالتزام بتوفير الوقت الكافي للدراسة والتحضير للامتحانات وضمان الوقت الكافي للراحة.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4 mb-2">التقييم والامتحانات:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>الالتزام بالاطلاع على سياسة التقييم المعتمدة والتقيد بكل ما جاء فيها.</li>
                <li>الالتزام بالمواعيد المحددة الخاصة بالتقييم والامتحانات.</li>
                <li>الالتزام بمتابعة التقييمات والامتحانات للأبناء بشكل مستمر ودوري لرفع أدائهم خلال العام الدراسي.</li>
                <li>الالتزام والتأكد من جاهزية الأبناء لأداء الامتحان من خلال (إحضار جميع الأدوات اللازمة، الشحن الكامل لجهاز الحاسب الآلي/اللوحي).</li>
                <li>الالتزام بقواعد ولوائح تأدية الامتحان وعدم الغش أو تسريب أسئلة الامتحانات أو المشاركة فيها بأي شكل من الأشكال.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`flex ${highlightConfirm ? 'aegov-alert alert-error mb-5' : ''}`}>

          <input
            type="checkbox"
            name="confirmInput"
            ref={confirmInputRef} // Attach the ref to the checkbox
            required
            onClick={() => { setConfirm(!confirm); setHighlightConfirm(!highlightConfirm) }}
            checked={confirm}
            className='mr-2' // Add highlight class if needed
          />

          <p className="mr-3">
            أقر أنا - الطرف الثاني - أنني قرأت بنود ومحتويات ميثاق الشراكة بين ولي الأمر والطالب والمدرسة ذات الصلة، وأو
            أوافق على الالتزام بها، ودعم المدرسة في جميع الجوانب المتعلقة بتعليم أبنائي، وأن أكون شريكاً فعالاً في المسيرة
            التعليمية، وألتزم بالشروط والأحكام والقوانين المعمولة لإدارة سلوكهم، وأقر بالالتزام التام باللوائح والسياسات
            الصادرة عن مؤسسة الإمارات للتعليم المدرسي ذات الصلة.*
          </p>

        </div>

        <div className=" p-6 border  border-gray-300 rounded-lg mb-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4   border-gray-300 py-4 ">
            <div className="flex flex-col justify-between">
              <label className="mb-2">اسم مدير المدرسة:</label>
              <input
                type="text"
                value={studentInfo.PrincipalName}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="..................................................."
              />
              <label className="mb-2">التوقيع:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="..................................................."
              />
            </div>
            <div className="flex flex-col justify-between">
              <label className="mb-2">اسم ولي أمر الطالب/الوصي:</label>
              <input
                type="text"
                value={studentInfo.ParentName}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                placeholder="..................................................."
              />
              <label className="mb-2">التوقيع:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="..................................................."
              />
            </div>
            <div className="flex flex-col justify-between">
              <label className="mb-2">ختم المدرسة:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="..................................................."
              />
            </div>
            <div className="flex flex-col justify-between">
              <label className="mb-2">رقم الهوية الإماراتية:</label>
              <input
                type="text"
                value={studentInfo.ParentEmiratesID}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="..................................................."
              />
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#ebebebe3] shadow-[0_2px_-3px_-10px_5px_rgba(100,100,100,0.22)] p-4 ">
          <div className="container flex justify-between">

            <button onClick={handleSign} className="bg-blue-500 w-[150px] text-white font-bold py-4 px-4 rounded m-2  ">توقيع</button>
            <Link href={'/parent'} className="bg-green-500 w-[150px] text-center text-white font-bold py-4 px-4 rounded m-2">الرجوع</Link>
          </div>
        </div>
      </div>
    </>
  );
}

