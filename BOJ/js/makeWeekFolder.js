// save as commit-copy.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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

  // 폴더 생성
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`📁 폴더 생성 완료: ${targetDir}`);
  } else {
    console.log(`📁 폴더 이미 존재: ${targetDir}`);
  }

  // 파일 복사
  let successCount = 0;
  let failCount = 0;

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

    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`📄 복사 완료: ${path.basename(file)}`);
      successCount++;
    } catch (error) {
      console.log(`❌ 파일 복사 실패: ${file}`);
      console.log(`   오류: ${error.message}`);
      failCount++;
    }
  });

  console.log(`\n🎉 작업 완료!`);
  console.log(`  ✅ 성공: ${successCount}개`);
  console.log(`  ❌ 실패: ${failCount}개`);

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
