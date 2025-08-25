import pytest
from unittest.mock import Mock, MagicMock
from app.application.services.trademark_service import TrademarkService
from app.domain.models.trademark import Trademark, TrademarkCreate, TrademarkUpdate, TrademarkStatus
from datetime import datetime, timezone, timedelta

class TestTrademarkService:
    
    def setup_method(self):
        self.mock_repository = Mock()
        self.service = TrademarkService(self.mock_repository)
    
    def test_create_trademark_success(self):
        # Arrange
        trademark_data = TrademarkCreate(
            brand_name="Nike",
            title="Just Do It",
            status=TrademarkStatus.ENABLED
        )
        
        expected_trademark = Trademark(
            id=1,
            brand_name="Nike",
            title="Just Do It",
            status=TrademarkStatus.ENABLED,
            created_at=datetime.now(timezone(timedelta(hours=-5))),
            updated_at=datetime.now(timezone(timedelta(hours=-5)))
        )
        
        self.mock_repository.get_by_brand_name.return_value = None
        self.mock_repository.create.return_value = expected_trademark
        
        # Act
        result = self.service.create_trademark(trademark_data)
        
        # Assert
        assert result == expected_trademark
        self.mock_repository.get_by_brand_name.assert_called_once_with("Nike")
        self.mock_repository.create.assert_called_once_with(trademark_data)
    
    def test_get_trademark_by_id_success(self):
        # Arrange
        trademark_id = 1
        expected_trademark = Trademark(
            id=1,
            brand_name="Adidas",
            title="Impossible is Nothing",
            status=TrademarkStatus.ENABLED,
            created_at=datetime.now(timezone(timedelta(hours=-5))),
            updated_at=datetime.now(timezone(timedelta(hours=-5)))
        )
        
        self.mock_repository.get_by_id.return_value = expected_trademark
        
        # Act
        result = self.service.get_trademark_by_id(trademark_id)
        
        # Assert
        assert result == expected_trademark
        self.mock_repository.get_by_id.assert_called_once_with(trademark_id)
    
    def test_get_all_trademarks_success(self):
        # Arrange
        expected_trademarks = [
            Trademark(id=1, brand_name="Nike", title="Just Do It", status=TrademarkStatus.ENABLED, created_at=datetime.now(timezone(timedelta(hours=-5))), updated_at=datetime.now(timezone(timedelta(hours=-5)))),
            Trademark(id=2, brand_name="Adidas", title="Impossible is Nothing", status=TrademarkStatus.ENABLED, created_at=datetime.now(timezone(timedelta(hours=-5))), updated_at=datetime.now(timezone(timedelta(hours=-5))))
        ]
        
        self.mock_repository.get_all.return_value = expected_trademarks
        
        # Act
        result = self.service.get_all_trademarks(skip=0, limit=10)
        
        # Assert
        assert result == expected_trademarks
        self.mock_repository.get_all.assert_called_once_with(skip=0, limit=10)
   
        # Arrange
        brand_name = "Nike"
        expected_trademark = Trademark(
            id=1,
            brand_name="Nike",
            title="Just Do It",
            status=TrademarkStatus.ENABLED,
            created_at=datetime.now(timezone(timedelta(hours=-5))),
            updated_at=datetime.now(timezone(timedelta(hours=-5)))
        )
        
        self.mock_repository.get_by_brand_name.return_value = expected_trademark
        
        # Act
        result = self.service.get_trademark_by_brand_name(brand_name)
        
        # Assert
        assert result == expected_trademark
        self.mock_repository.get_by_brand_name.assert_called_once_with(brand_name)
    
  
        # Act & Assert
        with pytest.raises(ValueError, match="Brand name cannot be empty"):
            self.service.get_trademark_by_brand_name("")
        
        with pytest.raises(ValueError, match="Brand name cannot be empty"):
            self.service.get_trademark_by_brand_name("   ")