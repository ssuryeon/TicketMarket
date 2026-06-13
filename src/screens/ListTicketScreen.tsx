import { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Eyebrow } from '../components/ui';

export function ListTicketScreen() {
  const [price, setPrice] = useState('0.95');
  const [expiry, setExpiry] = useState('2025년 7월 10일');

  return (
    <Page>
      <Title>티켓 판매등록</Title>
      <Subtitle>가격을 정하고 온체인에 등록하세요. 구매자가 지갑에서 직접 구매합니다.</Subtitle>

      <Layout>
        <FormCard>
          <FormTitle>판매 정보</FormTitle>

          <Field>
            <Label>티켓 선택</Label>
            <Input as="div" $readonly>
              콜드플레이 · Music of the Spheres — #0042
            </Input>
          </Field>

          <Field>
            <Label>판매 가격 (ETH)</Label>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="decimal"
            />
          </Field>

          <Field>
            <Label>만료일</Label>
            <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} />
          </Field>

          <FeeNote>최종 판매가에서 플랫폼 수수료 2% + 창작자 로열티 1%가 자동 차감됩니다.</FeeNote>

          <Button $variant="primary" $full>
            마켓에 티켓 등록
          </Button>
        </FormCard>

        <PreviewSide>
          <Eyebrow>미리보기</Eyebrow>
          <PreviewCard>
            <PreviewAccent />
            <ArtistName>Coldplay</ArtistName>
            <TourName>Music of the Spheres</TourName>

            <InfoBlock>
              <InfoLabel>일시</InfoLabel>
              <InfoValue>2025년 7월 12일 · 오후 7:00 KST</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>장소</InfoLabel>
              <InfoValue>서울올림픽주경기장</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>좌석</InfoLabel>
              <InfoValue>A구역 — 앞열 · 14B석</InfoValue>
            </InfoBlock>

            <PerfLine />

            <InfoBlock>
              <InfoLabel>토큰 ID</InfoLabel>
              <TokenValue>#0042 · 0x4a2f...8c3d</TokenValue>
            </InfoBlock>

            <AskBox>
              <AskLabel>판매 희망가</AskLabel>
              <AskValue>{price || '0'} ETH</AskValue>
            </AskBox>
          </PreviewCard>

          <ChainNote>스마트 컨트랙트 등록 · 즉시 정산 · 비수탁형</ChainNote>
        </PreviewSide>
      </Layout>
    </Page>
  );
}

const Page = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 40px 120px 96px;

  @media (max-width: 1024px) {
    padding: 32px 24px 72px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
`;

const Subtitle = styled.p`
  margin: 12px 0 0;
  font-size: 15px;
  color: ${({ theme }) => theme.color.muted};
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
  gap: 48px;
  margin-top: 36px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const FormCard = styled(Card)`
  padding: 28px;
`;

const FormTitle = styled.h2`
  margin: 0 0 24px;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
`;

const Field = styled.div`
  margin-bottom: 22px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.ink};
`;

const Input = styled.input<{ $readonly?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
  font-size: 13px;
  color: ${({ theme }) => theme.color.ink};

  &:focus { border-color: ${({ theme }) => theme.color.accent}; outline: none; }
`;

const FeeNote = styled.div`
  margin: 6px 0 24px;
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.accentSoft};
  color: ${({ theme }) => theme.color.accent};
  font-size: 12px;
  line-height: 1.5;
`;

const PreviewSide = styled.div``;

const PreviewCard = styled(Card)`
  position: relative;
  margin-top: 12px;
  padding: 30px 28px 28px;
  overflow: hidden;
`;

const PreviewAccent = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.color.accent};
`;

const ArtistName = styled.div`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
`;

const TourName = styled.div`
  margin-top: 6px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.muted};
`;

const InfoBlock = styled.div`
  margin-top: 18px;
`;

const InfoLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.color.mutedLight};
`;

const InfoValue = styled.div`
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.ink};
`;

const PerfLine = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 22px 0 0;
`;

const TokenValue = styled.div`
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.accent};
`;

const AskBox = styled.div`
  display: inline-block;
  margin-top: 22px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.accentSoft};
`;

const AskLabel = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.color.accent};
`;

const AskValue = styled.div`
  margin-top: 2px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.accent};
`;

const ChainNote = styled.p`
  margin: 22px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.color.mutedLight};
`;
