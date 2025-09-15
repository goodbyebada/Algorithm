// save as commit-copy.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// 파일명에서 숫자만 추출하는 함수
function extractFirstNumber(fileName) {
  const match = fileName.match(/\d+/);
  return match ? match[0] : null;
}

// Set 사용 (고유한 문제 번호만 필요한 경우)
function getBojProblemInfoUnique(fileNames) {
  const uniqueProblems = new Set();

  fileNames.forEach((fileName) => {
    const pn = extractFirstNumber(fileName);

    if (pn) {
      uniqueProblems.add(pn); // Set은 add()만 사용
    }
  });

  return uniqueProblems;
}

try {
  // 커밋 메시지 확인
  const commitMsg = execSync("git log -1 --pretty=%B", {
    encoding: "utf8",
  }).trim();

  console.log(`현재 커밋 메시지: ${commitMsg}`);

  const algorithmPattern =
    /\[algorithm\]\s*(\d{4})년\s*(\d{1,2})월\s*(\d+)주차/;
  const match = commitMsg.match(algorithmPattern);
  const [, year, month, week] = match.map(Number);

  console.log("✅ 커밋 메시지 조건 충족!");

  // git 루트 디렉토리 찾기
  const gitRoot = execSync("git rev-parse --show-toplevel", {
    encoding: "utf8",
  }).trim();
  console.log(`📍 Git 루트: ${gitRoot}`);

  // 커밋된 파일 목록 가져오기
  const filesOutput = execSync("git diff --name-only HEAD~1 HEAD", {
    encoding: "utf8",
  }).trim();
  const files = filesOutput ? filesOutput.split("\n").filter(Boolean) : [];

  if (files.length === 0) {
    console.log("❌ 커밋된 파일이 없습니다.");
    process.exit(0);
  }

  console.log(`📝 커밋된 파일 ${files.length}개 발견:`);
  // files.forEach((file) => console.log(`  - ${file}`));

  // 동적 폴더명 생성: YYYY/YYYY.M월-N주차
  const targetDir = path.join(
    gitRoot,
    `${year}`,
    `${year}.${month}월-${week}주차`
  );

  console.log(`📁 대상 폴더: ${targetDir}`);

  // 폴더 존재 여부 확인 및 예외 처리
  if (fs.existsSync(targetDir)) {
    // 폴더가 이미 존재하고 파일이 있는지 확인
    const existingFiles = fs.readdirSync(targetDir);
    if (existingFiles.length > 0) {
      console.log(`📁 폴더가 이미 존재하고 파일이 있습니다: ${targetDir}`);
      console.log(
        `⚠️  이미 복사했습니다. (기존 파일 ${existingFiles.length}개)`
      );
      console.log(`\n기존 파일들:`);
      existingFiles.forEach((file) => console.log(`  - ${file}`));
      process.exit(0);
    } else {
      console.log(`📁 폴더는 존재하지만 비어있습니다: ${targetDir}`);
    }
  } else {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`📁 폴더 생성 완료: ${targetDir}`);
  }

  // 파일 복사 및 BOJ 정보 수집
  let successCount = 0;
  let failCount = 0;
  const copiedFiles = []; // 성공적으로 복사된 파일명들

  files.forEach((file) => {
    const srcPath = path.join(gitRoot, file);

    // 파일이 실제로 존재하는지 확인
    if (!fs.existsSync(srcPath)) {
      console.log(`❌ 파일을 찾을 수 없습니다: ${file}`);
      console.log(`   시도한 경로: ${srcPath}`);
      failCount++;
      return;
    }

    const destPath = path.join(targetDir, path.basename(file));
    const fileName = path.basename(file);

    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`📄 복사 완료: ${fileName}`);
      successCount++;
      copiedFiles.push(fileName); // 성공한 파일명 저장

      // 파일 복사와 동시에 문제 번호 확인
      const problemNumber = extractFirstNumber(fileName);
      if (problemNumber) {
        console.log(`   🔢 문제 번호 감지: ${problemNumber}`);
      }
    } catch (error) {
      console.log(`❌ 파일 복사 실패: ${file}`);
      console.log(`   오류: ${error.message}`);
      failCount++;
    }
  });

  // BOJ 문제 정보 수집 및 출력
  const uniqueProblems = getBojProblemInfoUnique(copiedFiles);

  console.log(`\n🎉 작업 완료!`);
  console.log(`  ✅ 성공: ${successCount}개`);
  console.log(`  ❌ 실패: ${failCount}개`);

  // BOJ 문제 정보 출력
  if (uniqueProblems.size > 0) {
    const sortedProblems = Array.from(uniqueProblems).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    console.log(
      `\n문제 : ${sortedProblems.map((num) => `${num}번`).join(", ")}`
    );
    console.log(`총 푼 문제 : ${uniqueProblems.size}개`);
  } else {
    console.log(`\n문제 번호가 포함된 파일이 없습니다.`);
  }

  if (successCount > 0) {
    console.log(`\n📂 복사된 파일 위치: ${targetDir}`);
  }
} catch (error) {
  console.error("❌ 스크립트 실행 중 오류 발생:");
  console.error(error.message);

  // git 명령어 오류인 경우 추가 안내
  if (error.message.includes("git")) {
    console.error("\n💡 이 스크립트는 git 저장소 내에서 실행되어야 합니다.");
    console.error("   git init이나 git clone된 폴더에서 실행해주세요.");
  }

  process.exit(1);
}
